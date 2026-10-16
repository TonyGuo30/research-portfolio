// Figure regions are normalized bounds on the supplied, unmodified manuscript images.
const lenses = {
  parallax: [
    ['Grounding asymmetry',[0,0,.31,.55],'The conversation misses interactions and artifact versions in specialized applications.'],
    ['Grounding Loop',[.33,0,.355,.62],'Route, Work, Read Back, and Ground connect conversational intent with application evidence.'],
    ['Research workflows',[.71,.25,.29,.68],'The manuscript instantiates the approach in Literature Synthesis and Network Analysis.']
  ],
  'prediction-to-execution': [
    ['Benchmark construction',[.005,.15,.31,.84],'Task families, controlled representations, and explicit reference targets define the benchmark.'],
    ['Two prediction paths',[.32,.16,.37,.83],'Direct prediction is compared with structured formalization and deterministic calculation.'],
    ['Evaluation dimensions',[.7,.15,.3,.84],'Structural recovery, numerical agreement, robustness, applicability, and executability are inspected separately.']
  ],
  enactivecanvas: [
    ['Spatial context',[.01,0,.21,.43],'Selected and organized notes communicate which materials should inform the next response.'],
    ['Idea variation',[.72,0,.25,.41],'Direction and distance express the perspective and degree of an idea variation.'],
    ['Context alignment',[.8,.55,.18,.43],'The context panel makes the material supplied to the AI visible.']
  ],
  'virt-lab': [
    ['Scenario setup',[0,.16,.27,.82],'Scenario descriptions initialize agent roles, entities, and the environment.'],
    ['Agent coordination',[.3,0,.41,.42],'The simulation manager coordinates decisions and updates in a changing 2D environment.'],
    ['Simulation outcomes',[.74,.35,.26,.65],'The figure connects simulation records with team and agent performance, and post-hoc interviews.']
  ]
};
export function artifactViewer(p) {
  if (!p.image) return '';
  const {width:w,height:h}=p.image;
  const views=[['Full figure',[0,0,1,1],p.caption],...lenses[p.id]];
  return `<section class="artifact-viewer" aria-label="Explore the manuscript figure"><div class="artifact-paper"><div class="artifact-topline"><span>FIGURE 01 / MANUSCRIPT</span><a class="paper-figure-link artifact-expand" data-project="${p.id}" href="${p.image.src}" target="_blank" rel="noopener noreferrer">Expand figure ↗</a></div><svg class="artifact-canvas" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="artifact-title"><title id="artifact-title">${p.image.alt}</title><defs><clipPath id="figure-crop"><rect width="${w}" height="${h}"/></clipPath></defs><image href="${p.image.src}" width="${w}" height="${h}" clip-path="url(work/${p.id}/#figure-crop)"/></svg><span class="artifact-footnote">Original manuscript figure</span></div><aside class="artifact-inspector"><h2>Inside the paper</h2><div class="artifact-controls" role="group" aria-label="Figure focus">${views.map(([label,box,caption],i)=>`<button type="button" data-figure-view="${box.map((v,j)=>Math.round(v*(j%2?h:w))).join(' ')}" data-caption="${caption}" aria-pressed="${i===0}"><span>0${i+1}</span>${label}<span aria-hidden="true">↗</span></button>`).join('')}</div><p class="artifact-caption" aria-live="polite">${p.caption}</p></aside></section>`;
}
const bar=(label,value,suffix='%')=>`<div class="data-bar"><span>${label}</span><div class="bar-track" aria-hidden="true"><i style="--value:${value}%"></i></div><strong>${Number(value).toFixed(suffix ? 1 : 2)}${suffix}</strong></div>`;
export function evidenceVisual(p){
  if(p.id==='parallax') return `<section class="evidence-explorer" aria-labelledby="chart-title"><div class="chart-heading"><div><h3 id="chart-title">Perceived usability</h3><p>Mean System Usability Scale score · 0–100</p></div><div class="chart-controls" role="group" aria-label="Evaluation cohort"><button type="button" data-chart="literature" aria-pressed="true">Literature Synthesis</button><button type="button" data-chart="network" aria-pressed="false">Network Analysis</button></div></div>${[['literature','Literature Synthesis · 8 researchers',74.38,59.38],['network','Network Analysis · 4 researchers',86.88,47.50]].map(([id,label,a,b])=>`<div class="chart-panel" data-chart-panel="${id}"><p class="chart-context">${label}</p>${bar('Parallax',a,'')}${bar('CLI baseline',b,'')}<div class="chart-axis"><span>0</span><span>50</span><span>100</span></div></div>`).join('')}<p class="chart-note">Within each cohort, participants used both systems. Descriptive means from small, separate cohorts; no inferential significance tests.</p></section>`;
  if(p.results) return `<section class="evidence-explorer" aria-labelledby="chart-title"><div class="chart-heading"><div><h3 id="chart-title">Selection ≠ execution</h3><p>300 formalization conditions · Manuscript Table 3</p></div><div class="chart-controls" role="group" aria-label="Benchmark metric"><button type="button" data-chart="coverage" aria-pressed="true">Execution coverage</button><button type="button" data-chart="accuracy" aria-pressed="false">Family accuracy</button></div></div>${[['coverage',2,'Execution coverage'],['accuracy',1,'Family accuracy']].map(([id,col,label])=>`<div class="chart-panel" data-chart-panel="${id}"><p class="chart-context">${label} · percentage of all conditions</p>${p.results.rows.map(row=>bar(row[0],parseFloat(row[col]))).join('')}<div class="chart-axis"><span>0%</span><span>50%</span><span>100%</span></div></div>`).join('')}<p class="chart-note">Fixed manuscript order, not a general model ranking. Inspect conditional error and its varying denominators in the full comparison table below.</p></section>`;
  const pairs={enactivecanvas:['What participants valued','Exploration, reflection, ownership, and intent formation.','Where friction remained','Greater effort, a learning cost, and difficulty synthesizing a final proposal.'],'virt-lab':['What the platform enables','Configure scenarios and inspect actions, conversations, and simulation records.','What remains to establish','Whether simulated patterns meaningfully explain or predict human-team behavior.'],'hidden-in-plain-text':['What is compared','Sparse and dense retrieval; sanitization, normalization, and attribution-gated answering.','What is measured','Answer-time attacks, retrieval rank shifts, utility, and latency.'],consentdiff:['Policy evidence','Monthly snapshots and semantic clause alignment reveal changing claims.','Interface evidence','DOM signals and screenshot cues expose whether those choices are accessible.']};
  const x=pairs[p.id];
  return `<div class="evidence-pair"><div><span class="pair-index">01</span><h3>${x[0]}</h3><p>${x[1]}</p></div><div><span class="pair-index">02</span><h3>${x[2]}</h3><p>${x[3]}</p></div></div>`;
}
