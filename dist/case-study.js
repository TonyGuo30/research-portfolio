// Optional figure and evidence inspection. All source content stays in the HTML.
export function initializeCaseStudy() {
  document.querySelectorAll('.artifact-viewer').forEach(viewer=>{
    const svg=viewer.querySelector('.artifact-canvas');
    const title=svg.querySelector('title');
    const originalTitle=title.textContent;
    const buttons=[...viewer.querySelectorAll('[data-figure-view]')];
    const clip = svg.querySelector('clipPath rect');
    const clipUrl = new URL(location.href);
    clipUrl.hash='figure-crop';
    svg.querySelector('image').setAttribute('clip-path',`url("${clipUrl.href}")`);
    let frame;
    function setBounds(bounds) {
      svg.setAttribute('viewBox',bounds.join(' '));
      ['x','y','width','height'].forEach((attr,i)=>clip.setAttribute(attr,bounds[i]));
    }
    function focusRegion(index) {
      const button = buttons[index];
      cancelAnimationFrame(frame);
      const start = svg.getAttribute('viewBox').split(' ').map(Number);
      const end = button.dataset.figureView.split(' ').map(Number);
      viewer.classList.toggle('is-focused',index!==0);
      buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
      title.textContent = index===0 ? originalTitle : button.textContent;
      viewer.querySelector('.artifact-caption').textContent=button.dataset.caption;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setBounds(end);
        return;
      }
      const began = performance.now();
      function draw(now) {
        const t = Math.min(1,Math.max(0,(now-began)/260));
        const ease = 1-(1-t)**3;
        setBounds(t===1 ? end : start.map((n,i)=>n+(end[i]-n)*ease));
        if (t<1) frame=requestAnimationFrame(draw);
      }
      frame=requestAnimationFrame(draw);
    }
    buttons.forEach((button,i)=>button.addEventListener('click',()=>focusRegion(i)));
    viewer.querySelectorAll('[data-region]').forEach(region=>{
      function activate() {
        const index = Number(region.dataset.region);
        buttons[index].focus({preventScroll:true});
        focusRegion(index);
      }
      region.addEventListener('click',activate);
      region.addEventListener('keydown',event=>{
        if(event.key==='Enter'||event.key===' ') {event.preventDefault();activate();}
      });
    });
    viewer.classList.add('is-interactive');
  });
  document.querySelectorAll('.evidence-explorer').forEach(explorer=>{
    const buttons=[...explorer.querySelectorAll('[data-chart]')];
    const panels=[...explorer.querySelectorAll('[data-chart-panel]')];
    const select=button=>{
      buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
      panels.forEach(panel=>{panel.hidden=panel.dataset.chartPanel!==button.dataset.chart;});
    };
    buttons.forEach(button=>button.addEventListener('click',()=>select(button)));
    select(buttons[0]);
    explorer.classList.add('is-interactive');
  });
}
