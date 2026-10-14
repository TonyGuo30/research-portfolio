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
- `dist/app.js`: page composition, conceptual diagrams, and navigation.
- `dist/interactions.js`: topic filtering, figure viewer, reading progress, reveal motion, and copy-email behavior.
- `dist/index.html`: site metadata, header, and introduction.
- `dist/styles.css`: responsive screen layout.
- `dist/assets/Tony_Guo_Resume.pdf`: the supplied CV, unchanged.

The deliverable is the website. The CV download remains available. Local working notes, preview screenshots, and historical portfolio PDF exports are excluded from this repository.

The new manuscript figures are extracted directly from the supplied PDFs and displayed uncropped with full-resolution links. The source manuscripts themselves are not copied into the website. Their titles appear in the writing section with links to their case studies.

## Deployment

Live site: https://TonyGuo30.github.io/research-portfolio/

Repository: https://github.com/TonyGuo30/research-portfolio

Push changes to `main` to publish automatically. The GitHub Actions workflow in `.github/workflows/pages.yml` checks the JavaScript and deploys only `dist/` to GitHub Pages. Deployment progress appears in the repository’s Actions tab. GitHub Pages uses GitHub Actions as its publishing source.

`dist/` is a complete static site. All asset paths are relative so a repository subpath works. No API keys, backend, build step, analytics, or third-party scripts are required.

Do not double-click the HTML file: ES module loading needs an HTTP server. Use `npm run dev` or a static host.

## Content review

The portfolio is grounded in the supplied CV, papers, website, and repositories. Parallax, VirT-Lab, From Prediction to Execution, and EnactiveCanvas use original paper figures. Hidden-in-Plain-Text and ConsentDiff use labeled conceptual diagrams. Research questions are prospective directions, distinct from reported findings.

## Interaction design

Use the homepage research map or topic filters to explore related projects. Paper figures open in an accessible dialog with zoom, fit-to-view, original-image links, and Escape dismissal. Case-study chapters have shareable hash links. Publication rows expand to show bibliographic details. Motion respects the device’s reduced-motion setting.
