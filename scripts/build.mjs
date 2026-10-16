import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { folio, workIndex } from './folio.mjs';
import { projects } from '../dist/content.js';
import { projectList, homeContinuation, footer, caseStudy } from './templates.mjs';

const root = new URL('../dist/', import.meta.url);
const shell = await readFile(new URL('./page-shell.html', import.meta.url), 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const home = shell.replace('  {{BASE}}\n', '').replace('{{PROJECTS}}', projectList)
  .replace('{{FOLIO}}', folio).replace('{{WORK_INDEX}}', workIndex)
  .replace('{{CONTINUATION}}', homeContinuation).replace('{{FOOTER}}', footer);
await writeFile(new URL('index.html', root), home);

for (const project of projects) {
  const path = `work/${project.id}/`;
  const caseFooter = footer.replace('class="back-to-top" href="#"', `class="back-to-top" href="${path}#main"`);
  const page = shell.replace('{{BASE}}', '<base href="../../">')
    .replace(/<title>.*?<\/title>/, `<title>${escape(project.title)} — Tony Guo’s Research Portfolio</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(project.summary)}">`)
    .replace('class="skip-link" href="#main"', `class="skip-link" href="${path}#main"`)
    .replace('<a href="#selected-work">Work</a>', '<a href="#selected-work" aria-current="location">Work</a>')
    .replace(/<main id="main"[\s\S]*?<\/main>/, `<main id="main" tabindex="-1"><div id="case-view" class="wrap">${caseStudy(project)}</div></main>`)
    .replace('{{FOOTER}}', caseFooter);
  await mkdir(new URL(path, root), { recursive: true });
  await writeFile(new URL(`${path}index.html`, root), page);
}
console.log(`Built homepage and ${projects.length} complete case-study pages.`);
