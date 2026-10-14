import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { projects } from '../dist/content.js';

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
  assert.ok(page.includes('<base href="../../">'), `Broken asset base: ${project.id}`);
  for (const section of ['question', 'contribution', 'evidence', 'next']) {
    assert.ok(page.includes(`id="case-${section}"`), `Missing section: ${project.id}/${section}`);
    assert.ok(page.includes(`href="work/${project.id}/#case-${section}"`), `Broken chapter: ${project.id}/${section}`);
  }
  assert.ok(!page.includes('{{'), `Unrendered template: ${project.id}`);
}
assert.ok(!home.includes('{{'), 'Unrendered home template');
console.log(`Verified all ${projects.length} projects and complete case studies are present without JavaScript.`);
