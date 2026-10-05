# ECHE 3338 · Mass Transfer Focus

[Open the study app](https://eche3338-mass-transfer-focus.handofmidas42.chatgpt.site) · [Source prompt and credits](https://eche3338-mass-transfer-focus.handofmidas42.chatgpt.site/#source)

Made by [handofmidas42](https://github.com/immenseforest) using Codex, publicly available textbook material, and course materials developed by Professor S. Elyasi at Lakehead University.

An English-language study application for Chapters 1–3: diffusion, convective mass transfer and interphase transfer. It includes guided lessons, a classroom tube derivation, dynamic graphs, original practice questions, an Excel equation map, readable mathematical notation and unit definitions. Default navy dark mode uses high-contrast blue accents.

The comparison reader displays a lesson, textbook page and original note together. Full second- and third-edition textbooks are selected locally by the reader and are never uploaded by the app. Local note reading uses PDF.js and Tesseract.js with keyword matching. Files remain in the browser session.

## Credits

- [Professor Siamak Elyasi, Lakehead University](https://www.lakeheadu.ca/users/E/selyasi): course outline, teaching materials, classroom examples and the supplied teaching model.
- Jaime Benítez, *Principles and Modern Applications of Mass Transfer Operations*, second edition (Wiley, 2009) and third edition (Wiley, 2017).
- Robert E. Treybal, *Mass-Transfer Operations*, third edition: supplementary extracts and problems supplied with the course.
- KaTeX, PDF.js and Tesseract.js: mathematical typography, PDF reading and image text recognition. Their licences are retained under `public/vendor/`.

This is an independent study aid. The professor and publishers have not endorsed its AI-generated explanations or original practice questions. Public availability of a source does not grant an open licence to that source.

## Run the interface locally

```sh
python -m http.server 3338 --directory public
```

Open `http://localhost:3338`. Select your own textbook PDF in **Textbooks & notes**. Local browser storage retains only study progress and theme preferences; temporary book/note files are cleared by refresh.

The repository intentionally excludes original course PDFs, classroom photos, the supplied professor HTML model and workplace records. Source-document links and embedded course images require separately supplied assets under `public/sources/`. The reader supports local uploads without those assets; the authored lessons, equations, calculations and practice questions remain usable. The hosted study app is the complete reference interface.

## Build and checks

```sh
npm ci
node checks.cjs
node presence-check.cjs
npm run build
```

The build emits static assets in `dist/client` and an ES-module Worker in `dist/server/index.js`. Local static hosting does not provide the live visitor counter; it reports unavailable instead of inventing a number.

The hosted counter uses a D1 binding named `DB`, the generated `drizzle/` migration, and a server secret named `VISITOR_HASH_SECRET`. It counts keyed hashes of IP addresses seen within five minutes, refreshed by a heartbeat each minute while the page is visible. Raw IP addresses are not stored by the app. Expired records are deleted on the next heartbeat. Shared networks, VPNs and scripted requests limit interpretation: this counts network addresses, not people. Configure your own hosting project and secret before deploying a separate instance.

## Numerical scope

The photographed tube integral and an illustrative reconstruction are explicitly separated because source constants are inconsistent. The slide replay gives about 0.550653 m; the separately specified reconstruction gives about 5.772152 m at the displayed target. Neither is certified as the assignment answer without the original problem statement. Correlation ranges and units must be checked.

Guided teaching remains in Chapters 1–3. Page mapping uses the actual edition: equilibrium-stage operations begins at printed page 196 in the second edition and page 198 in the third. The consolidated source prompt is implemented in `public/provenance.js`.
