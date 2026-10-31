---
name: ui-consistency-audit
description: Audit an existing website for UI inconsistencies and visual-quality bugs, then fix them at the root cause without redesigning anything. Use this whenever the user mentions inconsistent buttons, mismatched pills or badges, broken or janky hover effects, text that disappears or turns invisible on hover, overlapping text, low contrast, dark mode looking broken, elements vanishing behind other elements, z-index or overflow bugs, horizontal scrollbars, layout shifting or clipping on mobile/tablet, duplicate or fighting CSS rules, or asks for a "UI polish pass", "visual QA", "design QA", "consistency check", or "make the UI feel consistent". Also use it proactively before a launch, before a design review, or after merging work from several people into one site, even if the user only points at a single page or one broken component — the same class of bug is almost always repeated elsewhere. Do NOT use it when the user wants a redesign, a new look, a new page, or a new component.
---

# UI Consistency & Visual Quality Audit

A repeatable audit-and-repair pass for an existing website. The job is to make what is
already there behave consistently and stay visible — not to improve the design.

## The prime directive: preserve, don't redesign

Every change must trace back to a defect you can name. Before editing anything, be able to
finish this sentence: *"This is broken because ___, and the user can observe it by ___."*
If you cannot, leave it alone.

**Never change** layout structure, copy, branding, the color palette, font families, type
scale, spacing scale, 3D/canvas elements, illustrations, animations that work, or the
overall visual direction.

**Intentional variation is not inconsistency.** A primary CTA and a ghost secondary button
*should* differ. A hero pill and a footer tag *may* differ. Only compare elements that are
the same *variant of the same component* — same role, same visual tier, same context. When
unsure whether a difference is deliberate, list it under "Needs your call" in the report
instead of normalizing it. Flattening deliberate hierarchy is a worse outcome than leaving
one button 2px off.

**Fix the cause, not the symptom.** `!important`, extra overrides, added specificity
(`div.card .btn.btn`), magic z-index values like `9999`, and wrapper divs are almost always
patches over a real problem. Find the rule that actually conflicts and repair it. If you
genuinely must add an override, say why in the report.

**Prefer tokens.** If the codebase has CSS variables, Tailwind config, or a theme file, the
real fix for "three slightly different paddings" is usually to point all three at the token
that already exists — not to hardcode a fourth value.

## Workflow

Seven phases, in order. Do not fix during phase 1–2; inspection gets polluted by half-fixes,
and you lose the ability to tell which change caused which regression.

### Phase 1 — Inspect

1. **Map the codebase.** Find the styling system (plain CSS, SCSS, CSS modules, Tailwind,
   CSS-in-JS, a UI kit), the theme mechanism (`.dark` class, `data-theme`, `prefers-color-scheme`),
   the token file, and the component directory. Note the framework and how to run it.
2. **Enumerate every route and state.** All pages, plus modals, dropdowns, menus, accordions,
   toasts, and any authenticated views you can reach. A "whole site" audit that only saw the
   homepage is not an audit — say so explicitly if you could only reach part of it.
3. **Build a component inventory.** Group every button, pill/eyebrow/badge, card, input, nav
   item, and link by *variant*, and record where each appears. This inventory is what makes
   "consistent" a checkable claim rather than a vibe.
4. **Run the probe.** `scripts/ui-audit.mjs` drives a headless browser over every route ×
   3 viewports × 2 themes and dumps measured facts: computed styles per variant, overlap
   pairs, contrast failures, hover/focus deltas, overflow, and CSS rule conflicts. See
   "Running the probe" below. If a browser genuinely cannot run in this environment, fall
   back to reading the CSS plus whatever screenshots the user can give you, and say in the
   report that findings are static-analysis only.
5. **Capture a baseline.** Screenshots of every route × viewport × theme *before* any edit,
   so phase 7 is a real comparison and not a memory test.

### Phase 2 — Identify issues

Work through `references/checklist.md` — it is the full check list, organized by the
categories below, with what to measure and what counts as a defect:

- Button system consistency (size, shape, padding, type, radius, motion, per variant)
- Hover / active / focus integrity — nothing may disappear, fade out, or lose contrast
- Eyebrow / pill / badge system consistency
- Text overlap and collision, section by section
- Visibility across headings, paragraphs, buttons, icons, pills, cards, nav, CTA, footer
- Light and dark mode parity
- Mechanical causes: z-index, opacity, overflow, pseudo-elements, gradients, transitions,
  CSS specificity
- Responsive behavior at mobile / tablet / desktop: clipping, wrapping, layout shift,
  horizontal overflow
- Duplicate and conflicting CSS rules

Record every finding as: **location → what's wrong → measured evidence → suspected root
cause → severity**. Severity: `blocker` (content invisible or unusable), `major` (clearly
noticeable, e.g. contrast failure, overlap, overflow), `minor` (measurable inconsistency
users may not consciously notice). Fix in that order.

Then **cluster**. Twelve buttons with the wrong radius is usually one missing token, not
twelve bugs. Clustering is what turns a 200-item list into an eight-line fix plan.

Show the user the fix plan before editing, with anything ambiguous flagged for their call.

### Phase 3 — Fix issues

- One cluster per commit, smallest change that resolves the root cause.
- Fix in the source of truth: token, base component, or shared class — not at call sites.
- Delete the dead/duplicate rule rather than out-specifying it.
- Keep every change reversible and reviewable; never reformat or "tidy" files you touched.
- Re-run the probe after each cluster so you catch a regression while it is still one change
  away from its cause.
- `references/root-causes.md` maps common symptoms to their real causes and the correct
  repair, including the ones that look like magic: invisible-on-hover text, elements that
  vanish behind gradients, and stacking contexts created by `transform` or `filter`.

### Phase 4 — Test light / dark mode

Every fixed element, in both themes, at every breakpoint. Confirm text, borders, icons,
button fills, pill backgrounds, dividers, shadows, focus rings, and overlays all remain
distinguishable against their actual backdrop. Watch for hardcoded colors that survive the
theme switch, near-invisible borders (a token like `--border` at 8% alpha over a light
surface), and shadows that read as a smudge in dark mode.

### Phase 5 — Test hover / active / focus

For every interactive element, in both themes: hover, press, and keyboard-focus it, and
verify label and icon stay visible and contrasty throughout the transition — not just at the
end state. Focus must be visible for keyboard users and must not be suppressed globally.
Transitions on the same variant should share duration, easing, and the properties they animate.

### Phase 6 — Test responsive layouts

Mobile (375), tablet (768), desktop (1440) minimum; add 320 and 1920 if the site has
edge-case layouts. Check for horizontal overflow, clipped text or shadows, unintended
wrapping (an orphaned word in a CTA, a nav item dropping to a second line), layout shift as
fonts/images load, tap targets under ~44px, and sticky/fixed elements colliding with content.

### Phase 7 — Final visual consistency check

Re-run the full probe clean, diff against the baseline, and sweep the screenshots yourself
before claiming success. Confirm: no new findings introduced, every fixed issue verified in
both themes and all viewports, no design change crept in, no `!important` added without a
stated reason. Then write the report using `references/report-template.md`.

## Running the probe

```bash
node scripts/ui-audit.mjs --base-url http://localhost:3000 \
  --routes / /about /pricing /contact \
  --out ./ui-audit-report
```

Useful flags: `--themes light,dark`, `--viewports 375x812,768x1024,1440x900`,
`--theme-mode class|attribute|media` with `--theme-target html|body`, `--selector-groups`
to name the variants you care about, `--no-screenshots`, `--baseline <dir>` to diff against
an earlier run. `--help` lists everything.

It needs Playwright (`npm i -D playwright && npx playwright install chromium`) and a running
dev server. Output: `report.json` (machine-readable findings), `report.md` (human summary),
and `screenshots/`.

**The probe finds candidates, not verdicts.** It cannot tell intentional variation from a
bug, it approximates contrast when backgrounds are images/gradients/3D, and it can't see
mid-transition frames. Always read its output with your own eyes on the screenshots, and
never paste raw probe output into the report as if it were a finding list.

## Reporting

Use `references/report-template.md`. The report must state what changed, why, the evidence,
what you deliberately left alone, and what needs the user's decision. A clean-sounding report
that quietly normalized a deliberate design choice is a failure even if every check passes.

## Reusing this on future projects

The skill is project-agnostic; nothing here is tied to one site. On a new project, the only
setup is telling the probe your URL, routes, and how the theme toggles. Worth doing once per
project and keeping in the repo:

- Save the invocation as an npm script (`"ui:audit": "node .../ui-audit.mjs --base-url ... "`).
- Commit the first run's `report.json` as the baseline so later runs diff against it.
- If a variant keeps getting flagged as inconsistent on purpose, record it in a short
  `ui-audit.config.json` `allowedVariations` list with the reason, so future runs stay quiet
  about it instead of you re-litigating it every time.
