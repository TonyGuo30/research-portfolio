import { projects, publications } from './content.js';
import { initializeInteractions, setProjectFilter, refreshReading, revealSections } from './interactions.js';

const arrow = '<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const external = (url, label, cls='text-link') => `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label} ${arrow}</a>`;
const node = (title, lines, primary=false) => `<div class="diagram-node${primary?' primary':''}"><strong>${title}</strong>${lines.map((s,i)=>`<p${i?' class="node-line"':''}>${s}</p>`).join('')}</div>`;
const flowArrow = '<span class="diagram-arrow" aria-hidden="true">→</span>';
const diagram = (id) => {
  if(id === 'parallax') return `<div class="diagram diagram-parallax"><div class="diagram-top">Preserve context across tools</div><div class="diagram-flow">${node('Conversation',['User intent','Questions & constraints'])}<span class="diagram-arrow" aria-hidden="true">⇄</span>${node('TaskFrame',['Workflow stage','Evidence & provenance'],true)}<span class="diagram-arrow" aria-hidden="true">⇄</span>${node('Applications',['Literature review','Network visualization'])}</div><div class="diagram-bottom">Application activity → semantic evidence → task continuation</div></div>`;
  if(id === 'virt-lab') return `<div class="diagram diagram-virt"><div class="diagram-top">Configurable teams · Shared spatial environment</div><div class="diagram-flow">${node('Scenario',['Roles & goals','Environment setup'])}${flowArrow}${node('Agent teams',['Reason · Act','Communicate'],true)}${flowArrow}${node('Inspection',['Event traces','Team behavior'])}</div><div class="agent-track" aria-hidden="true"><i>A</i><span></span><i>B</i><span></span><i>C</i><span></span><i>D</i></div><div class="diagram-bottom">Event scheduling + LLM reasoning + real-time coordination</div></div>`;
  if(id === 'hidden-in-plain-text') return `<div class="diagram diagram-rag"><div class="diagram-top">Where does evidence become an instruction?</div><div class="diagram-flow">${node('Social web',['Untrusted content','Attack carriers'])}${flowArrow}${node('Retrieval',['Sparse / dense','Mitigations'],true)}${flowArrow}${node('Generation',['Answer behavior','Utility & latency'])}</div><div class="trust-boundary"><span>Source content</span><span>↔ Trust boundary ↔</span><span>Agent behavior</span></div></div>`;
  return `<div class="diagram diagram-consent"><div class="diagram-top">Policy claims ↔ Observable choices</div><div class="diagram-flow">${node('Snapshot',['Monthly observations','Policy + interface'])}${flowArrow}${node('Align',['Clause changes','UI predicates'],true)}${flowArrow}${node('Audit',['Claim–UI alignment','Consent friction'])}</div><div class="timeline-strip"><span>t₁</span><i></i><span>t₂</span><i></i><span>t₃</span><i></i><span>tₙ</span></div><div class="diagram-bottom">Longitudinal comparison · No measured values depicted</div></div>`;
};

function projectVisual(p, detail=false) {
  if (!p.image) return diagram(p.id);
  return `<a class="paper-figure-link" data-project="${p.id}" href="${p.image.src}" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.title} figure at full size"><img class="paper-figure" src="${p.image.src}" width="${p.image.width}" height="${p.image.height}" alt="${p.image.alt}" loading="${detail?'eager':'lazy'}" decoding="async"><span class="figure-zoom">Expand figure ${arrow}</span></a>`;
}

function projectMetadata(p) {
  const fields=p.metadata || [{label:'Role',value:p.role},{label:p.id==='hidden-in-plain-text'?'Team':p.id==='consentdiff'?'Context':'Advisor',value:p.advisor},{label:'Period',value:p.period},{label:'Status',value:p.status}];
  return `<dl class="case-metadata">${fields.map(f=>`<div><dt>${f.label}</dt><dd>${f.value}</dd></div>`).join('')}</dl>`;
}

function resultTable(p) {
  if (!p.results) return '';
  const r=p.results;
  return `<section class="results-section" aria-labelledby="results-title"><p class="eyebrow">A closer look at the evidence</p><h2 id="results-title">${r.title}</h2><div class="table-scroll" tabindex="0" role="region" aria-label="Formalization results table"><table><caption>${r.caption}</caption><thead><tr>${r.columns.map(c=>`<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>${r.rows.map(row=>`<tr><th scope="row">${row[0]}</th>${row.slice(1).map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="results-note">${r.note}</p></section>`;
}

function projectRow(p) {
  return `<article class="project-row" id="project-${p.id}"><figure class="project-visual">${projectVisual(p)}<figcaption class="diagram-caption">${p.caption}</figcaption></figure><div class="project-summary"><p class="eyebrow">${p.number} / ${p.category}</p><h3>${p.title}</h3><p class="subtitle">${p.subtitle}</p><p class="summary">${p.summary}</p><a class="text-link" href="#work/${p.id}" aria-label="Read ${p.title} case study">Read case study ${arrow}</a><p class="project-meta">${p.meta}</p></div></article>`;
}

function caseStudy(p) {
  const next=projects[(projects.indexOf(p)+1)%projects.length];
  return `<article class="case-study" data-project="${p.id}">
    <a class="back-link" href="#project-${p.id}"><span aria-hidden="true">←</span> All work</a>
    <div class="case-heading"><div><p class="eyebrow">${p.number} / ${p.category}</p><h1 tabindex="-1">${p.title}</h1><p class="case-subtitle">${p.subtitle}</p></div>${projectMetadata(p)}</div>
    <nav class="case-toc" aria-label="On this page">${[['question','Overview'],['contribution','Contribution'],['evidence','Evidence'],['next','Next question']].map(([id,label])=>`<a href="#work/${p.id}/${id}" data-section="case-${id}">${label}</a>`).join('')}<span class="reading-label">Read at your own pace</span></nav>
    <figure class="case-figure">${projectVisual(p,true)}<figcaption class="diagram-caption">${p.caption}</figcaption></figure>
    <section class="question-block" id="case-question"><p class="eyebrow">01 / The question</p><div><h2>${p.question}</h2><p>${p.context}</p></div></section>
    <section class="contribution-block" id="case-contribution"><p class="eyebrow">02 / Contribution & method</p><div><h2>${p.id==='hidden-in-plain-text'?'A collaborative contribution':'My contribution'}</h2><p>${p.contribution}</p><ol class="method-list">${p.methods.map(([title,description],i)=>`<li><span class="method-index">0${i+1}</span><div><h3>${title}</h3><p>${description}</p></div></li>`).join('')}</ol></div></section>
    <section class="evidence-block" id="case-evidence"><div><p class="eyebrow">03 / Evidence</p><h2>What the work establishes</h2><p>${p.evidence}</p>${p.evidenceDetail?`<p>${p.evidenceDetail}</p>`:''}<div class="evidence-links">${p.links.map(l=>external(l.url,l.label)).join('')}</div></div><div id="case-next"><p class="eyebrow">04 / Next question</p><h2>${p.questionNext}</h2><p>${p.evaluation}</p></div></section>
    ${resultTable(p)}
    <p class="source-note">${p.source}</p>
    <nav class="case-navigation" aria-label="Case study navigation"><a class="text-link" href="#project-${p.id}">← Back to selected work</a><a class="text-link" href="#work/${next.id}">Next: ${next.title} →</a></nav>
  </article>`;
}

document.querySelector('#project-list').innerHTML=projects.map(projectRow).join('');
document.querySelector('#home-continuation').innerHTML=`
  <section id="research-lens" class="lens-section" aria-labelledby="lens-title"><div class="section-line"><p class="eyebrow">02 — Research lens</p><span>Questions for graduate study</span></div><h2 id="lens-title" class="section-title">Context. Evidence. Agency.</h2><div class="lens-grid"><article><p class="lens-number">01</p><h3>Shared context</h3><p>How can human–agent systems preserve intent across tools and time?</p><a href="#work/parallax">Through Parallax <span aria-hidden="true">↗</span></a><a href="#work/enactivecanvas">Through EnactiveCanvas <span aria-hidden="true">↗</span></a></article><article><p class="lens-number">02</p><h3>Inspectable evidence</h3><p>How can AI-generated models and retrieved evidence become easier to audit?</p><a href="#work/prediction-to-execution">Through stage-aware evaluation <span aria-hidden="true">↗</span></a></article><article><p class="lens-number">03</p><h3>Coordinated agents</h3><p>How can agent teams support the study of human collaboration?</p><a href="#work/virt-lab">Through VirT-Lab <span aria-hidden="true">↗</span></a></article></div></section>
  <section id="writing" class="writing-section" aria-labelledby="writing-title"><div class="section-line"><p class="eyebrow">03 — Research record</p><span>Publications & manuscripts</span></div><h2 id="writing-title" class="section-title">Selected writing</h2><div class="publication-list">${publications.map(p=>`<article class="publication"><details><summary><h3>${p.title}</h3></summary><p class="publication-subtitle">${p.subtitle}</p><p class="publication-authors">${p.authors}</p></details><p class="publication-venue">${p.venue}</p>${p.caseId?`<a class="paper-link" href="#work/${p.caseId}">Case study ${arrow}</a>`:external(p.url,'Paper','paper-link')}</article>`).join('')}</div></section>
  <section id="background" class="background-section" aria-labelledby="background-title"><div class="section-line"><p class="eyebrow">04 — Background</p><span>Research through building</span></div><div class="background-heading"><h2 id="background-title">An engineering foundation.<br>A human-centered direction.</h2><div><h3>University of Wisconsin–Madison</h3><p>B.S. Computer Engineering & Computer Science</p><p>Expected May 2027 · Honors in Computer Science</p></div></div><div class="experience-list"><article><h3>Yifang’s Lab</h3><p>Task context and grounding in human–AI collaboration</p><span>2026</span></article><article><h3>People and Robots Laboratory</h3><p>Comparing and reproducing LLM behavior across versions</p><span>From 2025</span></article><article><h3>RINGZ Lab · Notre Dame</h3><p>Backend systems for multi-agent team simulations</p><span>Summer 2025</span></article><article><h3>Oshkosh × UW–Madison</h3><p>AI-ready data, source lineage, and retrieval pipelines</p><span>From Sep 2026</span></article></div></section>
  <section class="code-section" aria-labelledby="code-title"><div><p class="eyebrow">Supporting engineering work</p><h2 id="code-title">From ideas to working systems.</h2><p>A few public repositories alongside the research.</p>${external('https://github.com/TonyGuo30','Explore GitHub')}</div><div class="repo-list">${[['agent-arcade','Agent Arcade','TypeScript · Interactive agent environment'],['NutriPath','NutriPath','Java · Nutrition learning & meal planning'],['Pokemon-Fusion-Art-Generator','Pokémon Fusion Art Generator','Python · CS 566 course project']].map(([slug,title,desc])=>`<a href="https://github.com/TonyGuo30/${slug}" target="_blank" rel="noopener noreferrer"><span><strong>${title}</strong><small>${desc}</small></span>${arrow}</a>`).join('')}</div></section>`;

document.querySelector('#footer').innerHTML=`<div class="wrap footer-main"><h2>Let’s talk about<br>human–AI collaboration.</h2><div><a class="email-link" href="mailto:tonyguo0607@gmail.com">tonyguo0607@gmail.com ${arrow}</a><div class="footer-links">${external('https://github.com/TonyGuo30','GitHub','')}${external('https://tonyguo30.github.io/TonyGuo.github.io/','Personal website','')}</div><button class="copy-email" type="button">Copy email</button><p class="copy-status" role="status" aria-live="polite"></p></div></div><div class="wrap footer-bottom"><span>© 2026 Tony (Haoze) Guo</span><span>Research portfolio · October 2026</span><a href="#">Back to top ↑</a></div>`;

const menuButton=document.querySelector('.menu-toggle');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');document.querySelector('#navigation').classList.remove('is-open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));document.querySelector('#navigation').classList.toggle('is-open',open);});
document.querySelector('#navigation').addEventListener('click',e=>{if(e.target.closest('a')) closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
let activeProject = null;
function route(){
  let hash;
  try{hash=decodeURIComponent(location.hash.slice(1));}catch{hash='';}
  const [,requested,section]=hash.startsWith('work/')?hash.split('/'):[];
  const project=projects.find(p=>p.id===requested);
  const home=document.querySelector('#home'),view=document.querySelector('#case-view');
  if(project){
    home.hidden=true;view.hidden=false;
    if(activeProject!==project.id){view.innerHTML=caseStudy(project);activeProject=project.id;}
    document.title=`${project.title} — Tony Guo’s Research Portfolio`;
    document.querySelector('meta[name="description"]').content=project.summary;
    if(section&&['question','contribution','evidence','next'].includes(section)){document.getElementById(`case-${section}`).scrollIntoView({behavior:'instant',block:'start'});}else{window.scrollTo({top:0,behavior:'instant'});view.querySelector('h1').focus({preventScroll:true});}
    refreshReading();
  }else{
    home.hidden=false;view.hidden=true;view.innerHTML='';activeProject=null;
    if(hash.startsWith('project-'))setProjectFilter('all');
    document.title='Tony (Haoze) Guo — Research Portfolio';
    document.querySelector('meta[name="description"]').content='Research in human–AI interaction, grounded AI agents, multi-agent systems, and trustworthy NLP.';
    const target=document.getElementById(hash);
    if(target) requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant',block:'start'}));
    else if(!hash||requested)window.scrollTo({top:0,behavior:'instant'});
  }
  closeMenu();
  revealSections();
  document.querySelectorAll('#navigation>a').forEach(a=>{if((project&&a.hash==='#selected-work')||a.hash===location.hash)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
}
initializeInteractions(projects);
window.addEventListener('hashchange',route);
route();
