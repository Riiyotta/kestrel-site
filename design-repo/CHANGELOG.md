# Changelog

## 1.0.0 (2026-10-22) - initial build

- Tokens: 505 foundation tokens kept from the clone's declared set by real usage (source references and/or the rendered computed-style crawl of 69 page routes at 1440 and 390); 12 unused declarations excluded. Vendor- or font-named config keys renamed to neutral token names.
- Motion: 49 atomic values (frame-measured, config-read, spec-sourced or CSS stand-in, each labelled) and 21 profiles with const-locked reduced-motion fallbacks. Measured values supersede the specs (glow 5.0s, logo glow 45deg/s, tile time loops, proof lift 0px).
- 17 primitives, 30 components, 107 section contracts with measured copy budgets (224 budgets) and structured responsive fields.
- 29 templates covering 69 page routes, plus 2 non-page routes (71 total). The six templates `ia.json` marks as planned are built and routed, and their node lists come from the page components.
- Closed asset-role vocabulary (11 roles, 4 settable) with generation and licensing policy, plus pinned-value checks for the compliance-critical roles.
- Draft-07 PageSpec schema generated from the contracts; a semantic validator with 24 rules, including the template node-list cross-reference; an adversarial suite; verify_all.py; and prove_drift.py.
