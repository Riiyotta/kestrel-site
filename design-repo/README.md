# Kestrel marketing site: design-repo

A machine-validated PageSpec system for generating new on-brand pages for the fictional product **Kestrel** without inventing colours, copy budgets, sections or structure.

Status: `design-review-pending`, `productionApproved: false` (see `registry.manifest.json`).

## What this is, and what it is not

- The visual system was measured from a **real, live company's marketing site** (via a clone of it). Only the design system is reproduced. **All content is original placeholder copy** for the fictional product Kestrel: the customers, people, prices, statistics and quotes are invented. The example PageSpec and every copy budget come from Kestrel copy only.
- Nothing in this repo is copied from the original site, its saved pages or any recon material. Those stay local-only reference and are never cited here.
- **Fonts:** only the faces the clone loads: Fraunces (display), Inter (text/UI) and Rethink Sans 600 (one press-kit heading), all SIL Open Font License via Google Fonts. The original site's commercial display and text faces are **not licensed** for this project and must not be used, named as substitutes or requested.
- **No outbound requests:** content has no third-party embeds, scripts, trackers or external links (the schema only accepts internal paths and anchors). The only external fetch in the clone is the Google Fonts stylesheet and files.
- **Forms never submit:** every form contract pins `submission: "local-success-state"`.

## Counts (recomputed from disk by `extraction/verify_all.py`)

| layer | count |
|---|---|
| foundation tokens (colour, type, radius, elevation, gradient, spacing, breakpoint) | 505 |
| motion atoms / motion profiles | 49 / 21 |
| semantic tokens (resolved in the light theme) / component tokens | 94 / 70 |
| primitives / components | 17 / 30 |
| sections | 107 |
| templates (page shapes) | 29 |
| page routes / non-page routes / total | 69 / 2 / 71 |
| asset roles (4 settable in a PageSpec) | 11 |
| compatibility rules | 24 |

## Layout

```
registry.manifest.json      status, versions (which are machine-checked), counts, entry points
tokens/00-foundation/       colour, typography, radius, elevation, gradient, spacing, breakpoint, motion (atoms)
tokens/10-semantic/         colour / type / shape roles, motion profiles with const-locked reduced-motion fallbacks
tokens/20-component/        approved application per component (references only)
tokens/30-layout/           1280px container, 80px gutters, 1440px page frame, breakpoints
tokens/themes/light.json    every semantic alias resolved to a foundation value (the only theme)
tokens/llm/                 component-allowlist (closed set), token-catalog, token-policy
primitives/ components/     content-agnostic building blocks
sections/                   one contract per section type: purpose, variants, content model with maxWords, motion, responsive, constraints
templates/templates.json    29 page shapes with explicit node sequences + routing rules
compatibility/graph.json    rhythm/position rules with severity
assets/asset-roles.json     closed assetRole vocabulary with generation and licensing policy
schema/                     generated draft-07 PageSpec schema, example, semantic validator, adversarial tests
extraction/                 citation ledger, style histogram, verify_all.py, prove_drift.py
```

## Method

1. **Tokens** come from the clone's declared tokens, kept only when used: each carries a source-usage count and a rendered count from a computed-style crawl of all 69 page routes at 1440 and 390 (`extraction/style-histogram.json`). 12 declared-but-unused tokens were dropped (listed in `extraction/measured-values.json` `excludedTokens`).
2. **Motion** comes from the measured motion modules of the clone (frame-sampled against the original). Where specs disagree, the measured value wins: announcement glow period 5.0s (not 4.5s), logo glow 45deg/s (not 72deg/s), integration tiles on time loops (not scroll parallax), proof cards lift 0px. WebGL scenes and Rive/video tiles of the original are **CSS/SVG stand-ins and static illustrations** (`evidenceLevel: css-standin`), not measured motion.
3. **Sections and templates** were derived from the page components (not copied from the IA draft). The IA draft (`ia.json`) marks 6 templates as planned; all six are built and routed. Every disagreement is listed in `extraction/measured-values.json` `corrections` and in the template's `iaJsonDiff`.
4. **Copy budgets:** `maxWords` = the longest real Kestrel instance of that field + 20% headroom (at least +1). Each budget records the observed count and where the longest instance lives.
5. **Citations:** every `measuredFrom` key resolves in `extraction/measured-values.json` to `path:line[-line]` in the source project plus a snippet that must appear in that range. These point outside the package on purpose; `verify_all.py` resolves them when the source tree sits next to the repo and only warns when it does not.

## Structurally unusual (documented, not normalised)

- `/__primitives` is a dev-only showcase: excluded from templates.
- `/glossary/<slug>` term links intentionally render the 404 page; there is no term template (the validator's `LINK_TARGETS` rule names this exception).
- `/llms-txt` (redirect) and `/llms.txt` (static text file) are non-page routes.
- `chrome.assistant-note` is a Kestrel-authored, opacity-0 pointer to `/llms.txt`. The original site's hidden "AI Agent Instructions" text layer was deliberately **not** reproduced and is not a section.
- 27 files in the clone (10 decorative images, 17 nav icons) originate from the original site: asset roles `decor.legacy-original` / `icon.legacy-original`, **replace before sharing**.
- Stock photos are Pexels License stock showing real people beside invented names and quotes: they must never imply endorsement.
- The integration catalogue / other-apps on-load fades are flagged in source but not implemented, so no motion profile claims them.

## Using it

```bash
pip install jsonschema                       # only dependency
python3 schema/build_schema.py               # regenerate the schema after editing a contract
python3 schema/semantic_validate.py page.json
python3 schema/tests/adversarial_test.py     # every mutation rejected, every control passes
python3 extraction/verify_all.py             # integrity + citations (warns if the source tree is absent)
python3 extraction/prove_drift.py            # proves the drift checks fail on injected defects
```

A PageSpec names a `template`, a `route` it serves, `head.title` and an ordered `nodes[]` of `{id, type, variant, content, motion}`. The validator cross-references the nodes against the declared template's real node list on (section, variant), then applies the compatibility rules and per-field word budgets. PageSpecs carry no style fields: styling belongs to the contracts.

## Version fields

`allowlistVersion` is machine-checked against `tokens/llm/component-allowlist.json`. `repositoryVersion` and `pageSpecVersion` are documentation-only markers. This repo is a snapshot of the source project at extraction time; re-diff it after the source changes.
