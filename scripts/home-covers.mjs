// The covers pair details of the original interfaces. The paper figures remain available separately.
const covers = {
  parallax: {
    caption: 'A highlighted passage in Zotero and the agent’s recommended next step.',
    panels: [
      {label:'PDF annotation', images:['parallax-cover-annotation.webp']},
      {label:'Agent reply', images:['parallax-cover-question.webp','parallax-cover-answer.webp']}
    ]
  },
  enactivecanvas: {
    caption: 'Selected canvas notes and the context visible to the AI. Details from Figure 1.',
    panels: [
      {label:'Canvas selection', images:['enactive-cover-notes.webp']},
      {label:'AI context', images:['enactive-cover-context.webp']}
    ]
  }
};

export function homeCover(project, eager=false) {
  const cover = covers[project.id];
  if (!cover) return '';
  return `<span class="home-cover cover-${project.id}" role="img" aria-label="${cover.caption}">
    ${cover.panels.map(({label,images})=>`<span class="cover-panel" aria-hidden="true"><span class="cover-panel-label">${label}</span>
      <span class="cover-crop">${images.map(file=>`<img src="assets/${file}" alt="" loading="${eager?'eager':'lazy'}" decoding="async">`).join('')}</span></span>`).join('')}
    <span class="cover-connector" aria-hidden="true">→</span></span>`;
}

export function coverCaption(project) {
  return covers[project.id]?.caption;
}
