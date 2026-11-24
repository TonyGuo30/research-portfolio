// Figure regions are normalized bounds on the supplied, unmodified manuscript images.
const lenses = {
  'hidden-in-plain-text': [
    ['Retrieved content',[.01,.1,.27,.78],'The model receives source material retrieved from the web.'],
    ['Evaluation pipeline',[.30,.1,.47,.79],'OpenRAG-Soc compares retrieval and defense settings on the same queries.'],
    ['Outcomes',[.80,.10,.19,.76],'The evaluation tracks answer behavior, retrieval rank, answer quality, and latency.']
  ],
  consentdiff: [
    ['Monthly snapshots',[.01,.12,.33,.75],'Each month pairs the policy text with the consent interface visible on the site.'],
    ['Parallel analysis',[.36,.12,.31,.75],'Policy clauses and interface choices are tracked separately over time.'],
    ['Claim and choice',[.70,.12,.29,.75],'The audit pairs a promise such as easy rejection with a visible way to reject.']
  ],
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
    ['Select notes',[.01,0,.21,.43],'Selecting notes on the canvas supplies their content to the next AI request. Open Context panel to see where a designer can inspect the material.'],
    ['Idea variation',[.72,0,.25,.41],'Direction and distance express the perspective and degree of an idea variation.'],
    ['Context panel',[.8,.55,.18,.43],'The context panel makes the material supplied to the AI visible.']
  ],
  'virt-lab': [
    ['Scenario setup',[0,.16,.27,.82],'Scenario descriptions initialize agent roles, entities, and the environment.'],
    ['Agent coordination',[.3,0,.41,.42],'The simulation manager coordinates decisions and updates in a changing 2D environment.'],
    ['Simulation outcomes',[.74,.35,.26,.65],'The figure connects simulation records with team and agent performance, and post-hoc interviews.']
  ]
};
export function manuscriptGallery(p, section) {
  const figures=(p.figures || []).filter(figure=>figure.section===section);
  if(!figures.length) return '';
  return `<section class="manuscript-gallery" aria-label="${section==='method'?'Method figures':'Study artifacts'} from the paper"><div class="manuscript-gallery-heading"><h3>${section==='method'?'From the manuscript':'Canvases from the study'}</h3><span>Original figures · Click to inspect</span></div><div class="manuscript-grid">${figures.map(figure=>`<figure class="manuscript-figure" id="figure-${figure.id}"><a class="paper-figure-link manuscript-image" data-project="${p.id}" data-figure="${figure.id}" href="${figure.src}" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.title} Figure ${figure.number}: ${figure.title}"><img src="${figure.src}" width="${figure.width}" height="${figure.height}" alt="${figure.alt}" loading="lazy" decoding="async"><span class="figure-zoom">Expand figure ↗</span></a><figcaption><span class="manuscript-source">${figure.source}</span><h4>${figure.title}</h4><p>${figure.caption}</p></figcaption></figure>`).join('')}</div></section>`;
}
export function artifactViewer(p) {
  const media = p.image || p.teaser;
  const {width:w,height:h} = media;
  const caption = media.caption || p.caption;
  const views = [['Full figure',[0,0,1,1],caption], ...lenses[p.id]].map(([label,box,note])=>({
    label, note, bounds:box.map((value,i)=>Math.round(value*(i%2?h:w)))
  }));
  const hotspots = views.slice(1).map(({label,bounds:[x,y,width,height]},i)=>
    `<rect class="figure-region" data-region="${i+1}" role="button" aria-label="Focus on ${label}" tabindex="0" x="${x}" y="${y}" width="${width}" height="${height}" rx="7"><title>${label}</title></rect>`).join('');
  return `<section class="artifact-viewer" aria-label="Explore the figure"><div class="artifact-paper">
    <div class="artifact-topline"><span>${p.image?'MANUSCRIPT · FIGURE 1':'CONCEPTUAL TEASER'}</span><a class="paper-figure-link artifact-expand" data-project="${p.id}" href="${media.src}" target="_blank" rel="noopener noreferrer">Expand figure ↗</a></div>
    <svg class="artifact-canvas" viewBox="0 0 ${w} ${h}" role="group" aria-labelledby="artifact-title"><title id="artifact-title">${media.alt}</title>
      <defs><clipPath id="figure-crop"><rect width="${w}" height="${h}"/></clipPath></defs><image href="${media.src}" width="${w}" height="${h}" clip-path="url(work/${p.id}/#figure-crop)"/>
      <g class="figure-regions">${hotspots}</g></svg></div>
    <div class="artifact-inspector"><div class="artifact-controls" role="group" aria-label="Figure focus">${views.map(({label,bounds,note},i)=>`<button type="button" data-figure-view="${bounds.join(' ')}" data-caption="${note}" aria-pressed="${i===0}">${label}</button>`).join('')}</div><p class="artifact-caption" aria-live="polite">${caption}</p></div></section>`;
}
const bar=(label,value,suffix='%')=>`<div class="data-bar"><span>${label}</span><div class="bar-track" aria-hidden="true"><i style="--value:${value}%"></i></div><strong>${Number(value).toFixed(suffix ? 1 : 2)}${suffix}</strong></div>`;
export function evidenceVisual(p){
  if(p.id==='parallax') return `<section class="evidence-explorer" aria-labelledby="chart-title"><div class="chart-heading"><div><h3 id="chart-title">Perceived usability</h3><p>Mean System Usability Scale score · 0–100</p></div><div class="chart-controls" role="group" aria-label="Evaluation cohort"><button type="button" data-chart="literature" aria-pressed="true">Literature Synthesis</button><button type="button" data-chart="network" aria-pressed="false">Network Analysis</button></div></div>${[['literature','Literature Synthesis · 8 researchers',74.38,59.38],['network','Network Analysis · 4 researchers',86.88,47.50]].map(([id,label,a,b])=>`<div class="chart-panel" data-chart-panel="${id}"><p class="chart-context">${label}</p>${bar('Parallax',a,'')}${bar('CLI baseline',b,'')}<div class="chart-axis"><span>0</span><span>50</span><span>100</span></div></div>`).join('')}<p class="chart-note">Each researcher used both Parallax and the command-line baseline with the same model and tools.</p></section>`;
  if (p.results) {
    return `<table class="paired-metrics"><caption>Share of the 300 formalization conditions · Manuscript Table 3</caption>
      <thead><tr><th scope="col">Model</th><th scope="col">Correct family</th><th scope="col">Runnable specification</th></tr></thead>
      <tbody>${p.results.rows.map(([model, accuracy, coverage])=>`<tr><th scope="row">${model}</th>${[accuracy,coverage].map(value=>`<td><strong>${value}</strong><span aria-hidden="true"><i style="width:${value}"></i></span></td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  if (p.id==='hidden-in-plain-text') {
    return `<figure class="result-plate"><figcaption>Models following embedded instructions</figcaption>
      <p class="chart-context">Macro-average across content types · 0–100%</p>
      ${bar('Baseline',24.9)}${bar('Combined defenses',4.7)}
      <p class="chart-note">95% confidence intervals: 20.3–29.2% at baseline and 3.5–6.3% with combined defenses. Source: Table 1.</p></figure>`;
  }
  if (p.id==='consentdiff') {
    return `<figure class="result-plate policy-plate"><figcaption>From a policy claim to an observable choice</figcaption>
      <div class="policy-example"><div><h3>Policy promise</h3><p>A visitor can easily decline optional cookies.</p></div>
      <div><h3>Interface check</h3><p>Look at the first consent banner.</p><div class="banner-example"><span>Reject all</span><span>Accept all</span></div></div></div>
      <p class="chart-note">Illustrative claim and interface check. In the audit, the associated difference in alignment score was +0.12 (95% CI 0.11–0.13).</p></figure>`;
  }
  return '';
}
