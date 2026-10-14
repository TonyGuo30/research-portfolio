# Tony (Haoze) Guo — Research Portfolio

An English, research-focused portfolio for HCI, HAI, AI agents, multi-agent systems, and NLP applications. It complements the existing academic website with six project narratives, source links, explicit contributions, and prospective research questions.

## Run locally

Requires Node.js 20.11 or later. No dependencies or installation step.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Keep the terminal running while viewing.

```sh
npm run check
```

## Edit

- `dist/content.js`: project narratives, metadata, and publication records.
- `scripts/page-shell.html`: site metadata, header, and introduction.
- `scripts/templates.mjs`: project pages, conceptual diagrams, and shared sections.
- `scripts/case-briefs.mjs`: concise contribution summaries, evidence highlights, and visible research qualifications. Keep these consistent with `dist/content.js`.
- `scripts/build.mjs`: generates the complete homepage and six case-study HTML pages.
- `dist/app.js`: optional menu interactions and compatibility with old hash links.
- `dist/interactions.js`: topic filtering, figure viewer, reading progress, reveal motion, and copy-email behavior.
- `dist/system-diagrams.js`: six deterministic interactive system sketches, shared by the static build and browser.
- `scripts/check-diagrams.mjs`: branch, reset, and calculation checks for the sketches.
- `dist/index.html` and `dist/work/*/index.html`: generated output; edit the templates and run `npm run build`.
- `dist/styles.css`: responsive screen layout.
- `dist/assets/Tony_Guo_Resume.pdf`: the supplied CV, unchanged.

The deliverable is the website. The CV download remains available. Local working notes, preview screenshots, and historical portfolio PDF exports are excluded from this repository.

The new manuscript figures are extracted directly from the supplied PDFs and displayed uncropped with full-resolution links. The source manuscripts themselves are not copied into the website. Their titles appear in the writing section with links to their case studies.

## Deployment

Live site: https://TonyGuo30.github.io/research-portfolio/

Repository: https://github.com/TonyGuo30/research-portfolio

Push changes to `main` to publish automatically. The GitHub Actions workflow in `.github/workflows/pages.yml` builds the pages, checks JavaScript and complete project content, and deploys only `dist/` to GitHub Pages. Deployment progress appears in the repository’s Actions tab. GitHub Pages uses GitHub Actions as its publishing source.

`dist/` is a complete static site. All asset paths are relative so a repository subpath works. The dependency-free build runs in Node.js. No API keys, backend, analytics, or third-party scripts are required. All research content, project links, chapter anchors, and publication disclosures work without JavaScript; filtering and the figure viewer are optional enhancements.

Use `npm run dev` or a static host to enable the optional ES-module interactions. Static project content remains readable even if those scripts cannot load.

## Content review

The portfolio is grounded in the supplied CV, papers, website, and repositories. Parallax, VirT-Lab, From Prediction to Execution, and EnactiveCanvas use original paper figures. Hidden-in-Plain-Text and ConsentDiff use labeled conceptual diagrams. Research questions are prospective directions, distinct from reported findings.

## Interaction design

Use the homepage research map or topic filters to explore related projects. Paper figures open in an accessible dialog with zoom, fit-to-view, original-image links, and Escape dismissal. Case studies have individual static URLs and native chapter anchors; older `#work/` links redirect to their corresponding pages. Publication rows expand to show bibliographic details. Motion respects the device’s reduced-motion setting.

Case studies start with a concise reading layer. Native disclosures expose methods, study details, results tables, and source notes; all source-backed narratives remain in the HTML. The optional “Show all details” control expands the full record. The figure viewer uses a neutral white and gray surface.

Each case study has a System chapter with a project-specific interactive sketch. These are explicitly illustrative: no LLM is called, no real user data is collected, and no demonstration values are empirical study results. Fitts’ law uses named illustrative constants; agent paths and consent snapshots are scripted examples. A static diagram is rendered during the build so the explanation survives script failures. The original paper figure is available in a native disclosure below the sketch.
