# ECHE 3338 — Mass Transfer Focus

Personal study app for Chapters 1–3 and Test 1, October 8, 2026. Default dark mode, English, no remote runtime dependencies, no AI API charges. Open `public/index.html` directly for offline use, or serve `public` on localhost. Source links and the professor's supplied HTML lab work offline with this folder intact. Progress/theme are browser-local and do not sync across devices or origins.

## What is included

- 13 guided lessons with diagrams, readable fractions, worked reasoning, unit checks and source references.
- 18-question diagnostic with missed-question review; five-problem 90-minute rehearsal with worked solutions and timer.
- Diffusion, coefficient, resistance and ideal-stage calculators.
- Dedicated eight-step methanol-tube walkthrough linked to classroom photographs; four mini-apps; keyboard/touch-accessible symbol explanations.
- Excel formula map and downloadable three-row TSV learning scaffold, plus forward-Euler convergence checks.
- Evidence/confidence map, chapter excerpt, selected professor materials, all 22 supplied photos and original professor HTML lab.

## Important model distinction

The final photographed integral is implemented as a **slide replay**. It yields about 0.550653 m for y=0.1755. Its upstream constants are inconsistent. A separately labelled illustrative reconstruction uses P=101 kPa, T=313 K, d=0.1 m, inlet u=1 m/s, μ=19.07e-6 Pa·s, y*=0.351, PD reference=0.845 at 298 K, and the photographed Sh correlation. It yields about 5.772152 m. The inlet speed is an explicit assumption; neither number is certified as the intended assignment answer without the original statement. The app documents the exact discrepancies.

Textbook tube correlations differ from the photo and remain separate selectable models. Correlation ranges are checked. “All content” in the outline is not a confirmed question list. October 29 is the separately named midterm. Older marking guidance is not confirmation of current Excel/notes/formula-sheet permissions.

## Evidence limits

All photos were uploaded October 5. Upload times are not class dates. Image numbers and board progression establish derivation order, not a dated course timeline. IMG_2397 is absent. The annotated Chapter 1 handout has handwriting, but no author/date; no separate dated notebook scans were found. Five added workplace screenshots were reviewed (IMG_2038, IMG_2040, IMG_2094, IMG_2095, IMG_2106). The Excel guide draws on their unit-labelled reporting columns, correction/calculation tabs, flags and control chart. Original workplace images, identifiers and coefficients are not published; no company names are used.

Both supplied editions are now available in the reader; the outline names second edition. The existing excerpt covers printed pp. 1–220, matching its PDF page numbers. Chapters 4 onward are parked. Preserve source restrictions; these files are for the user's personal study.

## Validation

Run `node checks.cjs` from this directory for numerical cases, flux sign/zero/thickness behaviour, two-film conservation, correlation range checks, stage limits, numerical integration, Euler convergence, Excel cell references and content integrity. It regenerates the TSV scaffold. `browser-check.cjs` uses the bundled Playwright package and a localhost server to check routes, interactions, persistence, timer, downloads and responsive layouts. Browser-specific WebMCP registration is optional and feature-detected; supported-host validation is unavailable in the local test browser.

## Updating with future class notes

Keep this Chapters 1–3 scope until explicitly extended. Add new dated notes to the evidence map, associate their original filenames and dates with the relevant photo/topic, resolve the original tube input statement before changing the model defaults, and rerun numeric/UI checks after changes. Do not use upload time as the lecture date.

## Equation, interaction and notes update

Equations now use locally bundled KaTeX 0.16.22 with MathML, proper derivatives/integrals, and hover/focus/tap definitions for symbols and units. The Excel page pairs 21 general equations with cell formulas and quantity/unit definitions. Downloaded spreadsheet formulas are unchanged.

All four classroom mini-apps show a linked selected point. The enrichment plot keeps a fixed full-profile axis while the target changes. Graph dots support hover, focus and tap readouts. A separate real-world page explains a water/air wet-surface example with a clearly labelled dimensionless teaching model, not a process design prediction.

Match my notes reads TXT/MD/CSV, PDFs and PNG/JPEG/WebP images locally. PDF.js 4.10.38 extracts text; Tesseract.js 6.0.1 with core 6.0.0 and English data 1.0.0 performs OCR when needed. All assets are same-origin, loaded on demand. No AI API, secret key, backend or external service receives notes. Matching uses transparent course-specific terms, not semantic AI understanding or formula verification. Users can correct extracted text and rematch. Data lives only in memory for this tab session; clearing or refreshing removes it. Limits: 5 files per selection, 20 MB each, first 12 PDF pages, 60 note pages per session, 100000 stored characters per page. PDFs/images require the hosted site or a local HTTP server; direct-file offline users can paste text. Handwriting and mathematical OCR are explicitly best-effort.

Run `node math-check.cjs` and `node extras-check.cjs` with the local server running in addition to the original checks. The latter covers changing graph markers, fixed axes, unit tooltips, text/PDF/image reading, editable matches, contextual previews, clearing, invalid-PDF recovery, phone layout and absence of third-party network requests. Vendored licenses are under dist/vendor.


## October 5 reader and presence update

App source is in `public/`. `node build.cjs` copies it to `dist/client` and emits the Sites Worker at `dist/server/index.js`. Host the app with its existing Sites project. Serve `public` locally for the study interface; the visitor counter explicitly reports unavailable without its server endpoint.

The reader compares the lesson, book and original note. Second-edition printed pages use a PDF offset of +30; third-edition pages use +31. Topic mapping is edition-specific: equilibrium stages start at printed p. 196 and p. 198 respectively. Full editions can be selected locally and are not included in the public deployment. The pre-existing third-edition excerpt remains available. Guided content remains Chapters 1–3. Local note uploads are session-only and are not uploaded to a server.

The production presence endpoint uses D1 (`DB`) and the secret `VISITOR_HASH_SECRET`. Every visible browser session sends one heartbeat per minute. An HMAC of the Cloudflare-provided IP address is upserted, expired entries are deleted and the last-five-minute aggregate is returned. Raw IP addresses and note contents are not stored by this feature. Shared networks, VPNs, dynamic addresses and scripted clients limit interpretation; it measures active network addresses, not people. If no new request arrives, expired database rows remain until the next heartbeat, but they cannot contribute to the active count.

Schema: `db/schema.ts`; generated migration: `drizzle/`. Drizzle generates migrations; no runtime DDL. `node presence-check.cjs` verifies deduplication, expiry and failure handling. `node reader-check.cjs` checks real PDF rendering and three-pane interaction using a local server on port 3339. Hosting details follow the [Cloudflare static-assets binding documentation](https://developers.cloudflare.com/workers/static-assets/binding/) and [D1 Worker API](https://developers.cloudflare.com/d1/worker-api/).

Credits: Dr. S Elyasi, Lakehead University; Jaime Benítez, *Principles and Modern Applications of Mass Transfer Operations*, second edition (Wiley, 2009) and third edition (Wiley, 2017); Robert E. Treybal, *Mass-Transfer Operations*, third edition. AI-authored app explanations are not official course statements. The source prompt is on `#source`. Public code: https://github.com/immenseforest/eche3338-mass-transfer-focus (original source documents excluded).


## October 6 corrections and supplementary lessons

The `#changelog` route documents known mistakes, how they were found, corrections and remaining uncertainty. Four screenshots in `public/images/changes` include the user-provided composition report and three actual captures of the corrected app. They contain interface content, not original workplace records or textbook pages.

Each of the 13 guided lessons has an expandable alternative-perspective panel (`further-learning.js`) with publisher-verified resource links, an original comparison and its limitations, and a retrieval question. External videos have not been audited end-to-end. MIT graduate material is optional enrichment, not exam scope. Resources remain external links; no third-party video files are hosted.

Equation reading paths can be toggled in lessons and the formula reference; the preference persists locally. Reader controls can collapse without a height-only PDF reload. Guided lessons retain separate scroll positions for standard and reader layouts.
