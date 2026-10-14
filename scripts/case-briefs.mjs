// Concise reading layer. Full, source-backed narratives remain in content.js.
export const briefs = {
  parallax: {
    role: 'I translated formative research into the interface and systems for task tracking, semantic read-back, and selective grounding.',
    takeaway: 'Researchers valued continuity and provenance; deciding when to intervene and how to repair context remained harder.',
    facts: [['5', 'Formative-study researchers'], ['12', 'Exploratory-evaluation researchers'], ['2', 'Research workflows']],
    caveat: 'Team-level findings from small, separate cohorts; no inferential significance tests.',
    steps: ['Route the work', 'Read back evidence', 'Ground selectively']
  },
  'prediction-to-execution': {
    role: 'As lead author, I developed the evaluation methodology for inspecting model selection, formalization, and execution separately.',
    takeaway: 'Selecting the right model does not guarantee an executable specification. Coverage matters alongside prediction error.',
    facts: [['6', 'LLM formalizers'], ['300', 'Formalization conditions'], ['64.7–96.0%', 'Execution coverage']],
    caveat: 'Benchmark findings do not establish behavioral validity or benefit for practitioners.',
    steps: ['Separate the stages', 'Vary the conditions', 'Test transfer']
  },
  enactivecanvas: {
    role: 'I contributed frontend and backend system design, connecting spatial canvas actions with context-aware AI generation.',
    takeaway: 'The studies suggest support for exploration and ownership, alongside greater effort and difficulty reaching a final proposal.',
    facts: [['23', 'Lab-study participants'], ['3', 'Expert designers in deployment'], ['2 weeks', 'Deployment duration']],
    caveat: 'Team-level studies; the findings do not establish improved creativity. My contribution focused on the system.',
    steps: ['Represent the workspace', 'Translate spatial actions', 'Make context visible']
  },
  'virt-lab': {
    role: 'I led backend development and optimization for event scheduling, LLM reasoning, and real-time agent coordination.',
    takeaway: 'An interactive testbed for configuring agent teams and inspecting their behavior in changing 2D environments.',
    facts: [['2D', 'Interactive environments'], ['12', 'Participants in the preprint study'], ['UIST ’25', 'Published system demo']],
    caveat: 'Evaluation is team-level work. Simulation realism alone does not establish validity for human teams.',
    steps: ['Schedule events', 'Connect reasoning to action', 'Inspect team behavior']
  },
  'hidden-in-plain-text': {
    role: 'I coauthored OpenRAG-Soc, a benchmark and evaluation harness for social-web prompt injection in RAG.',
    takeaway: 'One evaluation pipeline connects attack carriers, retrieval choices, and defenses to their utility and latency trade-offs.',
    facts: [['Sparse + dense', 'Retrieval paths'], ['3', 'Mitigation approaches'], ['End to end', 'Ingestion → retrieval → generation']],
    caveat: 'Joint research with Ziqi Wei; public materials do not specify an individual implementation split.',
    steps: ['Vary retrieval', 'Compare defenses', 'Measure trade-offs']
  },
  consentdiff: {
    role: 'As sole author, I connected policy changes with observable consent-interface behavior through a longitudinal audit.',
    takeaway: 'The paper reports higher claim–UI alignment where rejection is visible and requires less friction.',
    facts: [['Monthly', 'Site observations'], ['Policy + UI', 'Connected evidence'], ['CHI EA ’26', 'Published extended abstract']],
    caveat: 'Interface alignment is evidence about available choices; user-centered evaluation is needed to assess agency.',
    steps: ['Observe over time', 'Inspect the interface', 'Connect claims to actions']
  }
};
