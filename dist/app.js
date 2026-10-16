import { initializeCaseStudy } from './case-study.js?v=20261016-cases';
import { initializeArchive } from './archive.js?v=20261016-folio';
import { projects } from './content.js?v=20261016-folio';
import { initializeInteractions } from './interactions.js?v=20261016-folio';

// Preserve previously shared hash routes. Project content itself is now HTML.
const legacy=location.hash.match(/^#work\/([^/]+)(?:\/(question|contribution|evidence|next))?$/);
if(legacy && projects.some(project=>project.id===legacy[1])){
  location.replace(new URL(`work/${legacy[1]}/${legacy[2] ? `#case-${legacy[2]}` : ''}`,document.baseURI));
}

const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){
  menuButton.setAttribute('aria-expanded','false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')!=='true';
  menuButton.setAttribute('aria-expanded',String(open));
  navigation.classList.toggle('is-open',open);
});
navigation.addEventListener('click',event=>{if(event.target.closest('a')) closeMenu();});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header')) closeMenu();});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && menuButton.getAttribute('aria-expanded')==='true'){
    closeMenu();
    menuButton.focus();
  }
});
addEventListener('hashchange',closeMenu);
initializeInteractions(projects);
initializeArchive(projects);
document.documentElement.classList.add('js-ready');

initializeCaseStudy();
