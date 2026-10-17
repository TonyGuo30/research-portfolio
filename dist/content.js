// Editorial content is kept separate from rendering. See docs/content-audit.md for sources.
export const projects = [
  {
    id: 'prediction-to-execution', number: '02', category: 'HCI · LLM evaluation', title: 'From Prediction to Execution',
    subtitle: 'A plausible prediction is only the beginning.',
    summary: 'A stage-aware evaluation of how LLMs turn task descriptions into executable predictive models for HCI.',
    meta: 'Lead-author research · Evaluation methodology', role: 'Lead author',
    metadata: [{label:'Role',value:'Lead author'},{label:'Focus',value:'LLM evaluation · Predictive HCI'},{label:'Scope',value:'Six LLMs + constrained formalizers'},{label:'Status',value:'Research manuscript'}],
    question: 'What evidence should we require before treating an AI-produced predictive model as usable?',
    context: 'Models such as Fitts’ law, Hick–Hyman, and KLM can help analysts reason about interface performance. An LLM can produce a convincing estimate while choosing an unsuitable model, inventing missing inputs, or constructing a specification that cannot execute. This work evaluates those intermediate decisions separately from the final number.',
    contribution: 'I am the lead author of this research on LLM-assisted formalization in predictive HCI. The central contribution is an evaluation methodology that makes family selection, information recovery, representation validation, and deterministic execution separately inspectable. The study connects these diagnostics to implications for how AI-assisted modeling tools should be designed and evaluated.',
    methods: [
      ['Separate the stages', 'Distinguish direct numerical prediction from a hybrid pipeline in which the LLM proposes a structured specification and an independent validator and calculator govern execution.'],
      ['Test distinct condition sets', 'Evaluate 600 direct-prediction conditions across six families and five representations, plus a separate 300-condition formalization set spanning four families.'],
      ['Probe transfer and insufficiency', 'Extend the diagnostics with held-out descriptions, adversarial conditions, and 96 conditions reconstructed from 24 public sources. Inspect when systems should execute, abstain, or request information.']
    ],
    evidence: 'Across the 300 formalization conditions, LLM family-selection accuracy ranged from 88.0% to 97.0%, while execution coverage ranged from 64.7% to 96.0%. Deterministic calculation reduced matched mean absolute error for five of the six LLMs. Coverage and error therefore need to be reported together: a low error on executable cases does not account for failed formalizations.',
    results: {
      title:'Selecting a model is not the same as executing it',
      caption:'Formalization results · 300 Track A conditions · Manuscript Table 3',
      columns:['LLM formalizer','Family accuracy','Execution coverage','Conditional MAE (ms)'],
      rows:[['GPT-4.1','88.7%','81.3%','677.3'],['GPT-4.1-mini','92.7%','96.0%','1,325.6'],['Claude Sonnet 4.5','97.0%','86.3%','1,000.9'],['Gemini 2.5 Flash','90.0%','73.3%','874.0'],['Llama 3.3 70B','91.3%','64.7%','856.5'],['Qwen3-VL-32B','88.0%','94.0%','1,675.3']],
      note:'Family accuracy and execution coverage use all 300 conditions. Conditional MAE uses only each system’s executable cases, so its denominator varies across systems. These are results for the model versions and benchmark conditions in the manuscript, not a general model ranking.'
    },
    questionNext: 'How can an interface help analysts inspect, repair, and negotiate a candidate model before trusting its output?',
    evaluation: 'A next step is to study interactive inspection and repair with practitioners. The current benchmark checks formalization against explicit computational references; it does not establish behavioral validity with real users or practical benefit for analysts.',
    links: [{label:'View methodology figure',url:'assets/prediction-to-execution-overview.png'}],
    image:{src:'assets/prediction-to-execution-overview.png',width:1365,height:768,alt:'Figure 1 from From Prediction to Execution: benchmark construction, direct prediction and hybrid formalization, and stage-specific evaluation outcomes.'},
    caption:'Figure 1 from the manuscript · benchmark construction, formalization, and stage-specific evaluation.',
    source:'Source: From Prediction to Execution: A Stage-Aware Evaluation of LLM-Assisted Formalization in Predictive HCI, supplied manuscript, abstract, Sections 3–6, and Tables 3–4. Lead-author role confirmed by Tony.'
  },
  {
    id: 'parallax', number: '01', category: 'Human–AI collaboration', title: 'Parallax',
    subtitle: 'Keeping people and agents on the same page.',
    summary: 'Preserving task context and evidence across conversations and applications.',
    meta: '2026 · Research prototype', role: 'User research, interface & systems development',
    advisor: 'Dr. Yifang Wang', period: 'Jan–Sep 2026', status: 'In submission to CHI 2027',
    question: 'How can an agent stay grounded when the work moves beyond the chat?',
    context: 'People work across conversations, documents, and interactive applications. The agent may see the conversation while missing what changed in the workspace. Parallax addresses this grounding asymmetry by connecting task state with application-side evidence.',
    contribution: 'I conducted formative user research and translated findings on context loss, workflow continuity, provenance, and user control into design requirements. I designed and implemented task-state tracking, semantic read-back, and selective grounding mechanisms, alongside the interface and backend infrastructure.',
    methods: [
      ['Route work through a shared task specification', 'Represent intent, scope, constraints, and required operations. Route work to a specialized application when the conversation lacks the evidence or capability needed to continue.'],
      ['Read back meaning with provenance', 'Transform raw interactions and artifact states into interaction episodes and semantic observations. Preserve the distinction between observed activity, explicit human interpretations, and uncertain agent inferences.'],
      ['Ground selectively and explain the choice', 'Assess evidence relevance, select admissible observations, and check whether the evidence is sufficient. Preserve a trace back to the underlying work, and request clarification or further work when needed.']
    ],
    evidence: 'A formative study with five researchers informed the Grounding Loop: Route, Work, Read Back, and Ground. The team then conducted an exploratory evaluation with twelve researchers: eight in Literature Synthesis and four in Network Analysis. Each participant used both a conventional CLI baseline and Parallax, with the same model and task-relevant tools.',
    evidenceDetail: 'Mean System Usability Scale scores were 74.38 for Parallax versus 59.38 for the baseline in Literature Synthesis, and 86.88 versus 47.50 in Network Analysis. Participants valued continuity and provenance, while intervention timing and repair remained less consistent. These are descriptive findings from small, separate cohorts; the paper does not report inferential significance tests.',
    questionNext: 'How much context should an agent retain—and when should it ask the person to resolve an evidence gap?',
    evaluation: 'Observable activity does not fully reveal intent: opening a paper may signal uncertainty, and changing a visualization may be exploration rather than commitment. Future work should make grounding repair easier and examine what to capture, retain, or exclude across longer workflows and more applications.',
    links: [{label:'Explore the Grounding Loop',url:'assets/parallax-overview.png'}],
    image:{src:'assets/parallax-overview.png',width:1740,height:874,alt:'Parallax Figure 1: grounding asymmetry between conversation and applications, the Route–Work–Read Back–Ground loop, and its Literature Synthesis and Network Analysis instantiations.'},
    caption: 'Figure 1 from the Parallax manuscript · grounding asymmetry, the Grounding Loop, and two research workflows.',
    source: 'Source: Parallax: Addressing Grounding Asymmetry in Human–Agent Collaboration Across Conversation and Applications, supplied manuscript, Figure 1 and Sections 3–8. Individual contribution and submission status follow the supplied CV; study findings are team-level results.'
  },
  {
    id: 'enactivecanvas', number: '03', category: 'Human–AI interaction · Creativity support', title: 'EnactiveCanvas',
    subtitle: 'Thinking with AI beyond the chat window.',
    summary: 'A spatial workspace where arranging, selecting, and moving ideas becomes part of the conversation with AI.',
    meta: 'System design · Frontend & backend', role: 'System design · Frontend & backend',
    metadata:[{label:'Role',value:'System design · Frontend & backend'},{label:'Stack',value:'JavaScript · Fabric.js · Python · Flask'},{label:'Focus',value:'Spatial interaction · Human–AI co-creation'},{label:'Status',value:'Research manuscript'}],
    question: 'How can spatial interaction support design when the problem—and the designer’s intent—is still taking shape?',
    context: 'Ill-defined design problems evolve as people explore potential solutions. EnactiveCanvas turns a two-dimensional workspace into a way to organize fragments, revisit alternatives, and communicate context to an LLM. The system instantiates a spatial–cognitive design space connecting design cognition with spatial properties and actions.',
    contribution: 'My primary contribution was system design across the frontend and backend. I contributed to the interactive web system that connects canvas operations and note state with context-aware AI generation. This contribution centers on the system; the design-space framework and user-study findings described here belong to the collaborative research.',
    methods:[
      ['Represent an evolving workspace', 'The HTML/CSS/JavaScript frontend uses Fabric.js for notes, connections, dragging, selection, panning, and zooming. Note state includes content, position, type, and organizational properties for layers, ratings, and sub-canvases.'],
      ['Translate spatial actions into AI requests', 'The Python/Flask backend combines operation-specific prompts with note content, intent, and spatial parameters. Direction and distance encode the perspective and degree of an idea variation.'],
      ['Make context part of the interaction', 'Visible notes or an explicit selection supply context for generation. Separate operations support divergence, convergence, merging, question answering, and reflection; generated text returns to the canvas as notes or responses.']
    ],
    evidence: 'The team evaluated EnactiveCanvas in a comparative lab study with 23 participants and a two-week deployment with three expert designers. Qualitative findings suggest support for divergent exploration, reflection, ownership, and intent formation. Participants also reported greater effort, a learning cost, and difficulty synthesizing a final proposal.',
    evidenceDetail: 'ChatGPT received higher ratings for immersion and whether the results were worth the effort. The study did not find differences in the remaining creativity-support dimensions, user-experience measures, or expert ratings of design outcomes. These findings do not establish that EnactiveCanvas improves creativity.',
    questionNext: 'How can a spatial workspace help people move from expanding ideas to a coherent outcome?',
    evaluation: 'A next design iteration could connect spatial exploration to focused synthesis while preserving unfinished branches and user ownership. Evaluating longer-term use would help distinguish first-use friction from sustained benefits; the existing study does not isolate spatial interaction from other system differences.',
    links:[{label:'Explore the system figure',url:'assets/enactivecanvas-overview.png'}],
    image:{src:'assets/enactivecanvas-overview.png',width:3877,height:2254,alt:'EnactiveCanvas Figure 1 showing the actual canvas interface, spatial idea variation, layered thinking pathways, and the human–AI context panel.'},
    caption:'Figure 1 from the manuscript · the EnactiveCanvas interface and its spatial interaction mechanisms.',
    source:'Source: Spatial–Cognitive Mappings for Ill-Defined Design with AI: A Design Space and Its Instantiation in EnactiveCanvas, supplied manuscript, Sections 4–7. Contribution scope confirmed by Tony; evaluation findings are team-level results.'
  },
  {
    id: 'virt-lab', number: '04', category: 'Multi-agent systems', title: 'VirT-Lab',
    subtitle: 'A testbed for exploring how teams coordinate.',
    summary: 'Building the infrastructure behind customizable, spatial simulations of LLM agent teams.',
    meta: '2025 · Collaborative research · UIST demo', role: 'Backend development & performance optimization',
    advisor: 'Dr. Diego Gómez-Zará · RINGZ Lab', period: 'Summer 2025', status: 'UIST Adjunct 2025 · Extended manuscript in submission',
    question: 'How can researchers create and inspect dynamic teams of LLM agents?',
    context: 'Studying agent teams requires more than running several prompts. A simulation must coordinate agents, represent a changing environment, and expose what happened. VirT-Lab supports configurable scenarios and agent roles in interactive 2D environments.',
    contribution: 'I led backend development and optimization, implementing scalable event scheduling and LLM reasoning pipelines with Python, WebSockets, and GPT-4o-mini. My work supported real-time coordination across autonomous agents; the platform and research are collaborative work.',
    methods: [
      ['Schedule agent events', 'Coordinate actions over simulation time while agents move, communicate, and respond to the environment.'],
      ['Connect reasoning to action', 'Integrate LLM reasoning pipelines with the simulation engine and real-time communication infrastructure.'],
      ['Make behavior inspectable', 'Support a platform in which researchers can follow agent actions, conversations, and simulation records.']
    ],
    evidence: 'The UIST 2025 demo paper documents the system. The extended preprint describes component ablations, a rescue-mission comparison with real teams, a 12-participant user study, and scaling evaluations. These are team-level studies, not claims of individual study ownership.',
    questionNext: 'When do patterns in an agent simulation tell us something meaningful about human teams?',
    evaluation: 'Simulation realism and human-team validity need to be evaluated separately from software performance. More realistic-looking behavior alone does not establish that a simulation predicts human collaboration.',
    links: [{label:'UIST paper',url:'https://doi.org/10.1145/3746058.3758994'},{label:'Extended preprint',url:'https://arxiv.org/abs/2510.08242'},{label:'SEA workshop paper',url:'https://openreview.net/forum?id=BX1BnepTZO'}],
    image:{src:'assets/virt-lab-overview.png',width:2066,height:940,alt:'VirT-Lab Figure 1: natural-language scenario initialization, agents and entities in a 2D environment, a simulation manager coordinating decisions and updates, and team and agent performance outputs.'},
    caption: 'Figure 1 from the extended preprint · scenario setup, agent–environment interaction, and simulation outcomes.',
    source: 'Individual contribution: supplied CV. System and evaluation scope: UIST paper and extended preprint. Teaser figure: Simulating Teams with LLM Agents: Interactive 2D Environments for Studying Human–AI Dynamics, supplied arXiv:2510.08242v1, Figure 1.'
  },
  {
    teaser: {src:'assets/hidden-in-plain-text-teaser-v2.png',width:1774,height:887,alt:'AI-generated method overview: social-web carriers enter ingestion, sparse or dense retrieval, and generation. Optional sanitization and normalization act at ingestion; attribution gating acts at generation. Evaluation covers attack success, rank shift, answer utility, and latency.',caption:'Method overview (AI-generated) · Social-web carriers, RAG defenses, and evaluation.'},
    id: 'hidden-in-plain-text', number: '05', category: 'NLP · Trustworthy AI', title: 'Hidden-in-Plain-Text',
    subtitle: 'Testing the boundary between evidence and instruction.',
    summary: 'A reproducible benchmark for indirect prompt injection in social-web retrieval-augmented generation.',
    meta: '2026 · Coauthored research · WWW', role: 'Coauthor', advisor: 'Coauthored with Ziqi Wei', period: '2026', status: 'The ACM Web Conference 2026',
    question: 'What happens when retrieved social-web content tries to become an instruction?',
    context: 'Retrieval-augmented generation can give language models useful context, but it also brings untrusted text into the answer pipeline. Hidden-in-Plain-Text introduces OpenRAG-Soc to evaluate indirect prompt injection and retrieval poisoning in that setting.',
    contribution: 'I coauthored this work with Ziqi Wei. The joint contribution is a benchmark and evaluation harness for comparing web-native attack carriers, retrievers, and mitigations. The public materials do not specify an individual implementation split, so the system contributions below are attributed to the joint work.',
    methods: [
      ['Vary the retrieval path', 'Pair a social-web corpus with interchangeable sparse and dense retrievers.'],
      ['Evaluate mitigations', 'Compare HTML/Markdown sanitization, Unicode normalization, and attribution-gated answering.'],
      ['Measure the trade-offs', 'Track answer-time attacks, retrieval rank shifts, utility, and latency within an end-to-end evaluation.']
    ],
    evidence: 'The paper specifies a compact, reproducible benchmark-and-harness. Its value is a consistent comparison across ingestion, retrieval, and generation; this portfolio does not add unverified benchmark scores.',
    questionNext: 'How can an agent use retrieved evidence without treating that evidence as authority?',
    evaluation: 'A useful extension would connect pipeline-level defenses with interfaces that help people inspect attribution and understand when a source has influenced an answer. This is a prospective research direction.',
    links: [{label:'Read paper',url:'https://doi.org/10.1145/3774904.3792853'},{label:'arXiv version',url:'https://arxiv.org/abs/2601.10923'}],
    caption: 'Conceptual evaluation pipeline based on the paper; no benchmark results are depicted.',
    source: 'Title, authors, venue, and method: arXiv 2601.10923 and the related ACM DOI.'
  },
  {
    teaser: {src:'assets/consentdiff-teaser-v2.png',width:1774,height:887,alt:'AI-generated method overview: monthly policy and consent-UI snapshots feed parallel clause alignment and DOM-plus-screenshot classification. Policy claims map to observable UI predicates for weighted alignment comparisons. Mappings shown are illustrative.',caption:'Method overview (AI-generated) · Monthly snapshots, parallel analysis, and claim–UI alignment.'},
    id: 'consentdiff', number: '06', category: 'HCI · Privacy & user agency', title: 'ConsentDiff at Scale',
    subtitle: 'Connecting what a site promises to what people can do.',
    summary: 'Longitudinal audits of changing privacy policies and the friction in consent interfaces.',
    meta: '2026 · Single-author research · CHI EA', role: 'Sole author', advisor: 'Independent research', period: '2025–2026', status: 'CHI Extended Abstracts 2026',
    question: 'Do changing privacy interfaces make the choices promised in policy accessible?',
    context: 'Privacy is experienced through both policy language and interface actions. ConsentDiff connects these two layers over time, rather than treating a policy document or a consent banner as an isolated snapshot.',
    contribution: 'As sole author, I developed the longitudinal audit approach connecting policy changes with observable consent-interface behavior. The work brings together semantic clause alignment, interface classification, and a weighted claim–UI alignment measure.',
    methods: [
      ['Observe over time', 'Snapshot sites monthly and align policy clauses semantically to track clause-level changes.'],
      ['Inspect the interface', 'Combine DOM signals and screenshot cues to classify consent-UI patterns.'],
      ['Connect claims to actions', 'Map policy claims to observable predicates and compare alignment across time, regions, and verticals.']
    ],
    evidence: 'The published extended abstract reports continuing policy churn and higher claim–UI alignment where rejection is visible and lower-friction. The public paper is the source for the measurement scope and findings.',
    questionNext: 'How can longitudinal audits distinguish a clearer interface from a change that truly improves user agency?',
    evaluation: 'Observable interface alignment provides one form of evidence. Understanding whether people can recognize and exercise their choices also calls for user-centered evaluation. This is a proposed extension of the audit.',
    links: [{label:'Read paper',url:'https://doi.org/10.1145/3772363.3798570'},{label:'arXiv version',url:'https://arxiv.org/abs/2512.04316'}],
    caption: 'Conceptual audit workflow based on the paper; not a measured time series.',
    source: 'Title, authorship, venue, and method: arXiv 2512.04316 and the related ACM DOI.'
  }
];

// Keep the featured work order consistent across the homepage and case navigation.
projects.sort((a,b)=>Number(a.number)-Number(b.number));

export const publications = [
  {title:'Parallax',subtitle:'Addressing Grounding Asymmetry in Human–Agent Collaboration Across Conversation and Applications',authors:'Contribution · User research, interface & systems development',venue:'In submission to CHI 2027',caseId:'parallax'},
  {title:'From Prediction to Execution',subtitle:'A Stage-Aware Evaluation of LLM-Assisted Formalization in Predictive HCI',authors:'Lead author · Tony (Haoze) Guo',venue:'Research manuscript',caseId:'prediction-to-execution'},
  {title:'EnactiveCanvas',subtitle:'Spatial–Cognitive Mappings for Ill-Defined Design with AI: A Design Space and Its Instantiation in EnactiveCanvas',authors:'Contribution · System design, frontend & backend',venue:'Research manuscript',caseId:'enactivecanvas'},
  {title:'ConsentDiff at Scale',subtitle:'Longitudinal Audits of Web Privacy Policy Changes and UI Frictions',authors:'Haoze Guo',venue:'CHI EA 2026',url:'https://doi.org/10.1145/3772363.3798570'},
  {title:'Hidden-in-Plain-Text',subtitle:'A Benchmark for Social-Web Indirect Prompt Injection in RAG',authors:'Haoze Guo and Ziqi Wei',venue:'WWW 2026',url:'https://doi.org/10.1145/3774904.3792853'},
  {title:'VIRT-LAB',subtitle:'An AI-Powered System for Flexible, Customizable, and Large-scale Team Simulations',authors:'Mohammed Almutairi, Charles Chiang, Haoze Guo, et al.',venue:'UIST Adjunct 2025',url:'https://doi.org/10.1145/3746058.3758994'},
  {title:'Enabling User-Created Multi-Agent Simulations',subtitle:'Interactive and Customizable 2D Environments to Study Team Dynamics with LLM Agents',authors:'Mohammed Almutairi, Charles Chiang, Haoze Guo, et al.',venue:'NeurIPS SEA Workshop 2025',url:'https://openreview.net/forum?id=BX1BnepTZO'},
  {title:'Simulating Teams with LLM Agents',subtitle:'Interactive 2D Environments for Studying Human-AI Dynamics',authors:'Mohammed Almutairi, Charles Chiang, Haoze Guo, et al.',venue:'Preprint · In submission',url:'https://arxiv.org/abs/2510.08242'}
];
