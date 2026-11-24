// Findings appear beside the author's contribution before readers enter the figures.
export const briefs = {
  parallax: {
    takeaway: 'Researchers valued being able to trace an answer back to their work. Knowing when to intervene and how to correct a misunderstanding remained difficult.',
    evidenceTitle: 'How did it feel to resume a task across tools?',
    methodLabel: 'Task tracking and evidence selection',
    caveat: 'The two cohorts were small and separate. The scores are descriptive means.'
  },
  'prediction-to-execution': {
    takeaway: 'Llama 3.3 70B chose the right model family in 91.3% of conditions and produced a runnable specification in 64.7%.',
    evidenceTitle: 'Choosing a model and getting it to run',
    methodLabel: 'Benchmark design and transfer tests',
    caveat: 'The benchmark checks computational correctness. Its reference targets do not measure how well a model predicts real users.'
  },
  enactivecanvas: {
    takeaway: 'Participants described finding more directions to explore on the canvas. Bringing those branches together into a final proposal took more effort.',
    evidenceTitle: 'From exploring ideas to choosing one',
    methodLabel: 'Canvas state and the AI request',
    caveat: 'These are findings from the team’s studies. Expert ratings of design outcomes showed no detected difference between conditions.'
  },
  'virt-lab': {
    takeaway: 'In the team’s scaling study, agents exchanged fewer messages as the simulated rescue scenario became more complex.',
    evidenceTitle: 'What the simulation records revealed',
    methodLabel: 'Event scheduling and agent coordination',
    caveat: 'The communication pattern was observed in simulated teams. Its generality to human teams remains an open question.'
  },
  'hidden-in-plain-text': {
    takeaway: 'Across the tested content types, the rate at which models followed embedded instructions fell from 24.9% at baseline to 4.7% with the combined defenses.',
    evidenceTitle: 'How often did the model follow a web page’s instructions?',
    methodLabel: 'Benchmark design and measurements',
    caveat: 'The estimates apply to the content types, models, and retrieval settings evaluated in OpenRAG-Soc.'
  },
  consentdiff: {
    takeaway: 'Sites with a visible “Reject all” button scored 0.12 points higher on alignment between policy promises and interface choices.',
    evidenceTitle: 'Can a visitor act on a policy promise?',
    methodLabel: 'Monthly snapshots and the alignment score',
    caveat: 'The audit measures an association between observable interface features and policy alignment. It does not measure whether visitors felt in control.'
  }
};
