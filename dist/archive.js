// Local research navigation; no remote search or generated answers.
const keywords = {
  parallax:'HCI HAI human AI agents grounding context collaboration',
  'prediction-to-execution':'HCI evaluation benchmark LLM formalization Fitts law lead author',
  enactivecanvas:'HCI HAI human AI spatial creativity canvas frontend backend',
  'virt-lab':'AI agents multi-agent multiagent simulation teams coordination',
  'hidden-in-plain-text':'NLP RAG retrieval security trust prompt injection',
  consentdiff:'HCI privacy consent agency policy audit sole author'
};
const normalize = value => String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[–—-]/g,' ').replace(/\s+/g,' ').trim();
export function searchProjects(projects, query) {
  const terms=normalize(query).split(' ').filter(Boolean);
  return projects.map(p=>{
    const primary=normalize(`${p.title} ${p.category} ${keywords[p.id]||''}`);
    const body=normalize(`${primary} ${p.summary} ${p.role} ${p.contribution} ${p.question}`);
    return {project:p,match:terms.every(term=>body.includes(term)),score:terms.reduce((score,term)=>score+(primary.includes(term)?2:0)+(normalize(p.title).includes(term)?3:0),0)};
  }).filter(item=>item.match).sort((a,b)=>b.score-a.score).map(item=>item.project);
}
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function animateIn(element) {
  if (!reduced() && element?.animate) element.animate([{opacity:.25,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'cubic-bezier(.2,.7,.2,1)'});
}
function initializeFolio() {
  const buttons=[...document.querySelectorAll('[data-folio]')];
  const panels=[...document.querySelectorAll('[data-folio-panel]')];
  function select(index){
    buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    panels.forEach((panel,i)=>{panel.hidden=i!==index;});
    animateIn(panels[index]);
  }
  buttons.forEach((button,i)=>{
    button.addEventListener('click',()=>select(i));
    button.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(i+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
      select(next);buttons[next].focus();
    });
  });
}
function initializeIndex() {
  const index=document.querySelector('.work-index');
  if(!index)return;
  const gallery=document.querySelector('#project-list');
  const selectors=[...index.querySelectorAll('[data-index-select]')];
  const entries=[...index.querySelectorAll('[data-index-entry]')];
  const panels=[...index.querySelectorAll('[data-index-panel]')];
  const preview=index.querySelector('#index-preview');
  const dock=index.querySelector('.index-preview-dock');
  const mobile=matchMedia('(max-width:760px)');
  let current=selectors[0].dataset.indexSelect;
  function movePreview(){
    const entry=entries.find(el=>el.dataset.indexEntry===current);
    (mobile.matches?entry:dock).append(preview);
  }
  function select(id){
    if(id===current){movePreview();return;}
    current=id;
    selectors.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.indexSelect===id)));
    panels.forEach(panel=>{panel.hidden=panel.dataset.indexPanel!==id;});
    movePreview();animateIn(preview);
  }
  selectors.forEach(button=>{
    button.addEventListener('click',()=>{
      select(button.dataset.indexSelect);
      if(mobile.matches)button.closest('.index-entry').scrollIntoView({block:'start',behavior:'instant'});
    });
    button.addEventListener('keydown',event=>{
      if(!['ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
      event.preventDefault();
      const visible=selectors.filter(item=>!item.closest('.index-entry').hidden);
      const i=visible.indexOf(button);
      const next=event.key==='Home'?0:event.key==='End'?visible.length-1:(i+(event.key==='ArrowDown'?1:-1)+visible.length)%visible.length;
      visible[next].focus();select(visible[next].dataset.indexSelect);
      if(mobile.matches)visible[next].closest('.index-entry').scrollIntoView({block:'start',behavior:'instant'});
    });
  });
  function setView(view){
    const compact=view==='index';
    index.hidden=!compact;gallery.hidden=compact;
    document.querySelectorAll('[data-work-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.workView===view)));
    if(compact)movePreview();
    animateIn(compact?index:gallery);
  }
  document.querySelectorAll('[data-work-view]').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.workView)));
  document.addEventListener('portfolio:filter',event=>{
    entries.forEach(entry=>{entry.hidden=!event.detail.ids.includes(entry.dataset.indexEntry);});
    if(!event.detail.ids.includes(current)&&event.detail.ids.length)select(event.detail.ids[0]);
  });
  mobile.addEventListener('change',movePreview);
  // An incoming link to a gallery item must never point into a hidden layout.
  addEventListener('hashchange',()=>{
    if(location.hash.startsWith('#project-')){
      document.querySelector('[data-filter="all"]').click();setView('gallery');
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
  });
}
function initializeSearch(projects) {
  const trigger=document.querySelector('.search-trigger');
  if(!trigger||!('HTMLDialogElement' in window))return;
  const dialog=document.createElement('dialog');
  dialog.className='search-dialog';dialog.setAttribute('aria-labelledby','search-title');
  dialog.innerHTML=`<div class="search-heading"><h2 id="search-title">Find a research thread</h2><button type="button" class="search-close" aria-label="Close search">×</button></div><div class="search-body"><label class="search-field"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input type="search" aria-label="Search research" placeholder="Project, topic, or contribution…" autocomplete="off" spellcheck="false" aria-describedby="search-help"></label><div class="search-suggestions" aria-label="Suggested searches">${['HCI','Agents','NLP','Evaluation'].map(term=>`<button type="button" data-search-term="${term}">${term}</button>`).join('')}</div><nav class="search-results" aria-label="Search results"></nav><p class="search-empty" hidden>No matching projects. Try “HCI”, “agents”, or “privacy”.</p></div><div class="search-footer"><span id="search-help"><kbd>↑ ↓</kbd> Navigate <kbd>↵</kbd> Open <kbd>esc</kbd> Close</span><span class="search-count" role="status" aria-live="polite"></span></div>`;
  document.body.append(dialog);
  const input=dialog.querySelector('input');
  const results=dialog.querySelector('.search-results');
  let opener;
  function render(){
    const matches=searchProjects(projects,input.value);
    results.innerHTML=matches.map((p,i)=>`<a class="search-result${i===0?' is-active':''}" href="work/${p.id}/"><span class="search-number">${p.number}</span><span><strong>${esc(p.title)}</strong><small>${esc(p.category)}</small></span><span aria-hidden="true">↗</span></a>`).join('');
    dialog.querySelector('.search-empty').hidden=matches.length!==0;
    dialog.querySelector('.search-count').textContent=`${matches.length} result${matches.length===1?'':'s'}`;
  }
  function open(){
    if(dialog.open){dialog.close();return;}
    if(document.querySelector('dialog[open]'))return;
    opener=document.activeElement;
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
    document.querySelector('#navigation')?.classList.remove('is-open');
    input.value='';render();dialog.showModal();input.focus();
  }
  trigger.addEventListener('click',open);
  trigger.classList.add('is-ready');
  trigger.querySelector('kbd').textContent=/Mac|iPhone|iPad/.test(navigator.platform)?'⌘ K':'Ctrl K';
  document.addEventListener('keydown',event=>{
    if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
      event.preventDefault();open();
    }
  });
  input.addEventListener('input',render);
  dialog.querySelectorAll('[data-search-term]').forEach(button=>button.addEventListener('click',()=>{input.value=button.dataset.searchTerm;render();input.focus();}));
  input.addEventListener('keydown',event=>{
    const links=[...results.querySelectorAll('a')];
    if(!links.length)return;
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){
      event.preventDefault();links[event.key==='ArrowDown'?0:links.length-1].focus();
    }
    if(event.key==='Enter'){event.preventDefault();links[0].click();}
  });
  results.addEventListener('focusin',event=>{
    results.querySelectorAll('a').forEach(link=>link.classList.toggle('is-active',link===event.target));
  });
  results.addEventListener('keydown',event=>{
    if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
    const links=[...results.querySelectorAll('a')],i=links.indexOf(event.target);
    if(i<0)return;
    event.preventDefault();
    if(event.key==='ArrowUp'&&i===0){input.focus();return;}
    const next=event.key==='Home'?0:event.key==='End'?links.length-1:(i+(event.key==='ArrowDown'?1:-1)+links.length)%links.length;
    links[next].focus();
  });
  dialog.querySelector('.search-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
  });
  dialog.addEventListener('close',()=>opener?.isConnected&&opener.focus({preventScroll:true}));
  addEventListener('pageshow',()=>{if(dialog.open)dialog.close();});
}
export function initializeArchive(projects) {
  initializeFolio();initializeIndex();initializeSearch(projects);
}
