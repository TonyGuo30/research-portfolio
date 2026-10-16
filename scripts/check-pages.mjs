import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { projects } from '../dist/content.js';
import { briefs } from './case-briefs.mjs';

// Verify the HTTP documents contain the research before any browser JS runs.
const root = new URL('../dist/', import.meta.url);
const home = await readFile(new URL('index.html', root), 'utf8');
assert.equal((home.match(/class="project-row"/g) || []).length, projects.length);
for (const project of projects) {
  assert.ok(home.includes(`href="work/${project.id}/"`), `Missing link: ${project.id}`);
  const page = await readFile(new URL(`work/${project.id}/index.html`, root), 'utf8');
  assert.ok(page.includes(project.question), `Missing question: ${project.id}`);
  assert.ok(page.includes(project.contribution), `Missing contribution: ${project.id}`);
  assert.ok(page.includes(project.evidence), `Missing evidence: ${project.id}`);
  assert.ok(page.includes(project.source), `Missing source: ${project.id}`);
  for (const text of [project.context, project.evaluation, project.evidenceDetail, ...project.methods.flat()].filter(Boolean)) {
    assert.ok(page.includes(text), `Lost research detail: ${project.id}`);
  }
  const brief=briefs[project.id];
  assert.ok(page.includes(`<p class="evidence-caveat">${brief.caveat}</p>`), `Missing visible qualification: ${project.id}`);
  assert.ok(page.includes(brief.role) && page.includes(brief.takeaway), `Missing concise overview: ${project.id}`);
  assert.ok(page.includes('<base href="../../">'), `Broken asset base: ${project.id}`);
  for (const section of ['question', 'contribution', 'evidence', 'next']) {
    assert.ok(page.includes(`id="case-${section}"`), `Missing section: ${project.id}/${section}`);
    assert.ok(page.includes(`href="work/${project.id}/#case-${section}"`), `Broken chapter: ${project.id}/${section}`);
  }
  assert.ok(!page.includes('{{'), `Unrendered template: ${project.id}`);
}
assert.ok(!home.includes('{{'), 'Unrendered home template');
console.log(`Verified all ${projects.length} projects and complete case studies are present without JavaScript.`);

// Guard figure bounds and static evidence fallbacks, including the GitHub Pages base.
for (const project of projects) {
  const page=await readFile(new URL(`work/${project.id}/index.html`,root),'utf8');
  if(project.image){
    assert.ok(page.includes(`url(work/${project.id}/#figure-crop)`));
    const bounds=[...page.matchAll(/data-figure-view="([\d ]+)"/g)].map(match=>match[1].split(' ').map(Number));
    assert.equal(bounds.length,4);
    for(const [x,y,w,h] of bounds){
      assert.ok(w>0 && h>0 && x>=0 && y>=0);
      assert.ok(x+w<=project.image.width+1 && y+h<=project.image.height+1, `Out-of-bounds crop: ${project.id}`);
    }
  }
  assert.ok(!/class="chart-panel"[^>]* hidden/.test(page),'Charts must survive without JavaScript');
  if(project.results){
    for(const row of project.results.rows) for(const value of row.slice(1,3)) assert.ok(page.includes(`<strong>${value}</strong>`));
  }
}
console.log('Verified original-figure crop bounds, deployment-safe clip paths, and chart values.');
