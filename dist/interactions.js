// Progressive interactions. Content and primary navigation remain ordinary HTML.
const groups = {
  human: ['parallax', 'enactivecanvas', 'consentdiff'],
  agents: ['parallax', 'virt-lab'],
  trust: ['prediction-to-execution', 'hidden-in-plain-text', 'consentdiff']
};
let projectData = [];
let revealObserver;
let progress;
let readingFrame = 0;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function setProjectFilter(filter) {
  if (filter !== 'all' && !groups[filter]) return;
  let visible = 0;
  document.querySelectorAll('.project-row').forEach(row => {
    const show = filter === 'all' || groups[filter].includes(row.id.slice('project-'.length));
    row.hidden = !show;
    if (show) visible++;
  });
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  });
  document.querySelector('.result-count').textContent = `${visible} project${visible === 1 ? '' : 's'}`;
  revealSections();
  refreshReading();
}

export function revealSections() {
  if (!revealObserver) return;
  document.querySelectorAll('.project-row, .lens-grid article, .background-heading, .code-section').forEach(el => {
    if (!el.hidden && !el.dataset.revealed) revealObserver.observe(el);
  });
}

export function refreshReading() {
  if (readingFrame) return;
  readingFrame = requestAnimationFrame(() => {
    readingFrame = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
    const links = [...document.querySelectorAll('.case-toc a')];
    if (!links.length) return;
    let active = links[0];
    const threshold = document.querySelector('.case-toc').getBoundingClientRect().bottom + 80;
    for (const link of links) {
      const section = document.getElementById(link.dataset.section);
      if (!section) continue;
      const top = section.getBoundingClientRect().top;
      // Evidence and next question share a row on desktop; keep Evidence active
      // unless the reader explicitly followed the Next question chapter link.
      const parallelNext = link.dataset.section === 'case-next' && innerWidth > 760;
      if (top <= threshold && (!parallelNext || location.hash === '#case-next')) active = link;
    }
    links.forEach(link => {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}

function initializeViewer() {
  const dialog = document.createElement('dialog');
  dialog.className = 'figure-dialog';
  dialog.setAttribute('aria-labelledby', 'viewer-title');
  dialog.innerHTML = `<div class="viewer-header"><h2 id="viewer-title"></h2><div class="viewer-tools"><button class="viewer-zoom" type="button" aria-pressed="false">Zoom in</button><a class="viewer-original" target="_blank" rel="noopener noreferrer">Open original ↗</a><button class="viewer-close" type="button" aria-label="Close figure" autofocus>×</button></div></div><p class="viewer-hint" id="viewer-hint">Zoom in to inspect the figure.</p><div class="viewer-stage" tabindex="0" aria-label="Figure viewing area" aria-describedby="viewer-hint"><img alt="" draggable="false"></div><p class="viewer-caption"></p>`;
  document.body.append(dialog);
  const stage = dialog.querySelector('.viewer-stage');
  const img = stage.querySelector('img');
  const zoom = dialog.querySelector('.viewer-zoom');
  let trigger;
  function setZoom(expanded) {
    stage.classList.toggle('is-zoomed', expanded);
    img.style.setProperty('--zoom-width', `${Math.max(img.naturalWidth, stage.clientWidth * 1.7)}px`);
    zoom.setAttribute('aria-pressed', String(expanded));
    zoom.textContent = expanded ? 'Fit to view' : 'Zoom in';
    dialog.querySelector('.viewer-hint').textContent = expanded ? 'Scroll or drag to explore. Use Fit to view to see the whole figure.' : 'Zoom in to inspect the figure.';
    stage.scrollTo(0, 0);
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('.paper-figure-link');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const project = projectData.find(item => item.id === link.dataset.project);
    if (!project?.image || !dialog.showModal) return;
    event.preventDefault();
    trigger = link;
    dialog.querySelector('#viewer-title').textContent = `${project.title} · Figure 1`;
    dialog.querySelector('.viewer-caption').textContent = project.caption;
    dialog.querySelector('.viewer-original').href = project.image.src;
    img.src = project.image.src;
    img.alt = project.image.alt;
    setZoom(false);
    dialog.showModal();
  });
  zoom.addEventListener('click', () => setZoom(!stage.classList.contains('is-zoomed')));
  // Touch uses native scrolling; mouse dragging pans without unexpectedly
  // toggling the zoom when a reader tries to inspect a detail.
  let drag;
  stage.addEventListener('pointerdown', event => {
    if(event.pointerType !== 'mouse' || event.button !== 0 || !stage.classList.contains('is-zoomed')) return;
    drag={x:event.clientX,y:event.clientY,left:stage.scrollLeft,top:stage.scrollTop};
    stage.setPointerCapture(event.pointerId);
    stage.classList.add('is-dragging');
    event.preventDefault();
  });
  stage.addEventListener('pointermove', event => {
    if(!drag) return;
    stage.scrollLeft=drag.left+drag.x-event.clientX;
    stage.scrollTop=drag.top+drag.y-event.clientY;
  });
  const endDrag=()=>{drag=null;stage.classList.remove('is-dragging');};
  stage.addEventListener('pointerup',endDrag);
  stage.addEventListener('pointercancel',endDrag);
  stage.addEventListener('lostpointercapture',endDrag);
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => trigger?.isConnected && trigger.focus({preventScroll: true}));
  addEventListener('hashchange', () => { if (dialog.open) dialog.close(); });
}

export function initializeInteractions(projects) {
  projectData = projects;
  progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      for (const {target, isIntersecting} of entries) {
        if (!isIntersecting) continue;
        target.dataset.revealed = 'true';
        if (!reducedMotion()) target.classList.add('reveal-in');
        revealObserver.unobserve(target);
      }
    }, {threshold: 0.08});
  }
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => setProjectFilter(button.dataset.filter));
  });
  document.querySelectorAll('[data-theme]').forEach(button => {
    button.addEventListener('click', () => {
      setProjectFilter(button.dataset.theme);
      document.querySelector('#selected-work').scrollIntoView({behavior: reducedMotion() ? 'instant' : 'smooth'});
      document.querySelector(`[data-filter="${button.dataset.theme}"]`).focus({preventScroll:true});
    });
  });
  const copy = document.querySelector('.copy-email');
  copy?.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('tonyguo0607@gmail.com');
      status.textContent = 'Email address copied.';
      copy.textContent = 'Copied ✓';
    } catch {
      status.textContent = 'Copy unavailable. Select the email address above to copy it.';
    }
  });
  initializeViewer();
  addEventListener('scroll', refreshReading, {passive:true});
  addEventListener('resize', refreshReading, {passive:true});
  addEventListener('hashchange', refreshReading);
  refreshReading();
}
