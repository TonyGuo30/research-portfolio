// Carry the entry card through related projects, refreshes and browser history.
export function initializeWorkNavigation(projects) {
  const ids = new Set(projects.map(project=>project.id));
  const page = new URL(location.href);
  const encoded = page.searchParams.get('fromWork') || history.state?.fromWork;
  const [layout,filter,id] = String(encoded || '').split('.');
  const valid = ids.has(id) && ['folio','gallery','index'].includes(layout)
    && ['all','human','agents','trust'].includes(filter);
  const study = document.querySelector('.case-study');
  if (!study && page.searchParams.has('fromWork')) {
    page.searchParams.delete('fromWork');
    history.replaceState({...history.state,fromWork:valid ? encoded : null},'',page);
  }

  if (study) {
    if (!valid) return;
    // Keep the origin in same-page chapter URLs so an immediate refresh is safe.
    document.querySelectorAll('a[href]').forEach(link=>{
      const url = new URL(link.href);
      if (url.pathname===page.pathname && url.origin===page.origin && url.hash) {
        url.searchParams.set('fromWork',encoded);
        link.href=url.href;
      }
    });
    const home = new URL('.',document.baseURI);
    home.searchParams.set('fromWork',encoded);
    home.hash = layout==='folio' ? 'hero-title' : 'project-'+id;
    study.querySelectorAll('.back-link,.case-navigation .text-link').forEach(link=>link.href=home.href);
    const related = study.querySelector('.next-project-link');
    const next = new URL(related.href);
    next.searchParams.set('fromWork',encoded);
    related.href=next.href;
    // Animate only the title, and only on the first arrival from a visible card.
    try {
      const saved = JSON.parse(sessionStorage.getItem('portfolio-title'));
      sessionStorage.removeItem('portfolio-title');
      if (saved?.id===study.dataset.project && Date.now()-saved.time<5000 &&
          !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const heading=study.querySelector('h1');
        const rect=heading.getBoundingClientRect();
        heading.animate([
          {transformOrigin:'left center',transform:`translate(${saved.x-rect.left}px,${saved.y-rect.top}px) scale(${saved.size/parseFloat(getComputedStyle(heading).fontSize)})`,opacity:.6},
          {transformOrigin:'left center',transform:'none',opacity:1}
        ],{duration:240,easing:'cubic-bezier(.2,.7,.2,1)'});
      }
    } catch { /* Navigation also works when browser storage is unavailable. */ }
    return;
  }

  function restore() {
    if (!valid) return;
    document.querySelector(`[data-filter="${filter}"]`)?.click();
    document.querySelector(`[data-work-view="${layout==='index'?'index':'gallery'}"]`)?.click();
    const card = document.getElementById('project-'+id);
    let target = card.querySelector('h3 a');
    if (layout==='folio') {
      const panel = document.querySelector(`.folio-panel:has(a[href="work/${id}/"])`);
      if (!panel) return;
      document.querySelector(`[data-folio="${panel.dataset.folioPanel}"]`).click();
      target=panel.querySelector('h2 a');
    }
    if (layout==='index') {
      target=document.querySelector(`[data-index-select="${id}"]`);
      target.click();
    }
    target.focus({preventScroll:true});
    target.scrollIntoView({block:'center',behavior:'instant'});
  }
  // pageshow follows native fragment scrolling for explicit return links.
  addEventListener('pageshow',event=>{
    if (!event.persisted) requestAnimationFrame(restore);
  });

  document.addEventListener('click',event=>{
    const link=event.target.closest('a');
    const card=link?.closest('.project-row,.index-entry,.index-preview,.folio-panel');
    if(!card || link.classList.contains('paper-figure-link')) return;
    const destination=new URL(link.href);
    const projectId=destination.pathname.split('/').filter(Boolean).pop();
    if (!ids.has(projectId)) return;
    const view=card.matches('.folio-panel')?'folio':card.matches('.project-row')?'gallery':'index';
    const active=document.querySelector('[data-filter][aria-pressed="true"]').dataset.filter;
    const origin=[view,active,projectId].join('.');
    const heading=card.querySelector('h2,h3,[data-index-select] strong');
    if (heading && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect=heading.getBoundingClientRect();
      if (rect.bottom>0 && rect.top<innerHeight) {
        try {
          sessionStorage.setItem('portfolio-title',JSON.stringify({
            id:projectId,x:rect.left,y:rect.top,size:parseFloat(getComputedStyle(heading).fontSize),time:Date.now()
          }));
        } catch { /* Title motion is optional. */ }
      }
    }
    destination.searchParams.set('fromWork',origin);
    // Keep the plain link as the fallback, including for copied links.
    link.href=destination.href;
    history.replaceState({...history.state,fromWork:origin},'');
    setTimeout(()=>{link.href=new URL('work/'+projectId+'/',document.baseURI).href;},0);
  });
}
