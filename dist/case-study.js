// Optional figure and evidence inspection. All source content stays in the HTML.
export function initializeCaseStudy() {
  document.querySelectorAll('.artifact-viewer').forEach(viewer=>{
    const svg=viewer.querySelector('.artifact-canvas');
    const title=svg.querySelector('title');
    const originalTitle=title.textContent;
    const buttons=[...viewer.querySelectorAll('[data-figure-view]')];
    buttons.forEach((button,index)=>button.addEventListener('click',()=>{
      buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
      svg.setAttribute('viewBox',button.dataset.figureView);
      const bounds=button.dataset.figureView.split(' ');
      ['x','y','width','height'].forEach((attr,i)=>svg.querySelector('clipPath rect').setAttribute(attr,bounds[i]));
      title.textContent=index===0?originalTitle:`Detail: ${button.textContent.trim()}. ${button.dataset.caption}`;
      viewer.querySelector('.artifact-caption').textContent=button.dataset.caption;
      viewer.querySelector('.artifact-footnote').textContent=index===0?'Original manuscript figure · Select a focus to inspect':'Detail of the original figure · Full figure restores context';
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
        svg.getAnimations().forEach(animation=>animation.cancel());
        svg.animate([{opacity:.35,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'ease-out'});
      }
    }));
    viewer.querySelector('.artifact-footnote').textContent='Original manuscript figure · Select a focus to inspect';
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
