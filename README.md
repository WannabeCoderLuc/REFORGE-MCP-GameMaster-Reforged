# Project Sandtable — project site

Static project site for **`reforge-mcp`** — an open-source research and Workbench MCP server
for Arma Reforger / Enfusion. **71 tools, 366 tests.**

## The goal changed on 2026-09-09 (D-0017)

The server is now the whole project. **The Game Master framework rebuild is cancelled.** Game
Master remains the *target domain the server has to be able to mod* — the hardest thing to
point it at, and therefore the measure of whether the server works. Its 14-feature list is a
bank of test cases, not a roadmap.

That was decided on evidence. Building one small Game Master feature through the tooling — a
context action reporting how far each selected entity floats above the terrain — surfaced
**seven defects in the tooling meant to make it easy**, every one of which compiled cleanly and
failed silently. Trying to build something found all of them; counting features would have
found none.

So the question is measured by attempt rather than inventory: **can a real mod be built with
this?** Friction met while trying is a defect in the server, not something to work around.

Five capabilities define "usable", and all five are now proven rather than claimed — open
Workbench on a project, close and restart it, create addons and load worlds, switch Edit ↔
Play, and search Bohemia's own API documentation.

Why a server at all: Reforger's shipped API documentation is two engine versions behind,
cannot be regenerated on current Tools builds, and gets some core editor inheritance backwards
— so every index this server answers from is generated from your own installation and stamped
with the build it came from.

The server is also useful entirely on its own. It knows nothing about Sandtable; it answers
questions about Enfusion, and any Reforger modder can adopt it without the framework.

The live site lives in `docs/`.

## What the site claims, and what is actually true

The site is a status page, not marketing, and it is written to stay honest as the work
moves. When updating it, keep these distinctions intact:

- **reforge-mcp exists and runs.** All milestones M0-M8 are complete: **71 tools** under
  the `workbench` profile, **24** under `research` with **no writers**, **366 tests** green
  (open source: 353 passing, 3 intentional skips). The deferral list is empty — `mod_build`,
  the last tool in the spec, ships. Figures are measured against Arma Reforger build
  24903726.
- **The framework rebuild is cancelled (D-0017).** Nothing on the page may present Project
  Sandtable as a product in progress. Game Master is the *benchmark domain*, the F-list and
  the 14 wanted features are a **test-case bank**, and phase 8 is retired.
- **The three "novel capabilities"** — concurrent multi-GM editing, multi-step undo/redo in
  a live session, and live triggers — are neither promised nor being built. They are on the
  page as the hardest test cases, and must stay framed that way.
- **Five acceptance capabilities are proven, not claimed.** Launch on a project, close and
  restart, create addons and load worlds, switch Edit ↔ Play, and search Bohemia's Doxygen.
  Each is backed by a *reading* — loaded-addon list, entity count, re-read mode — never by
  a call that returned success. Keep the honest exception on the page: launching still needs
  one human click at Steam's custom-arguments prompt.
- **Only `mod_build validate` has actually been run.** `build` and `pack` ship but are
  untested, and the page says so. The same goes for `wb_inspect action:"aiStatus"`.
- **The handlers section explains the bridge, not the tooling.** It is the part readers ask
  about most: how a program outside the game drives the editor inside it. Keep it conceptual —
  no code, no file paths — and keep the honest cost in it, including that one bad handler edit
  takes the whole bridge down. There are **23** handlers.
- **"What's new" is a build log, not a highlight reel.** Defects found and fixed belong in it
  alongside features; several current entries are bugs, deliberately. Entries are added when
  work lands, each traceable to `EVIDENCE_LEDGER.md`, and **dated entries are not rewritten
  as history moves on** — a later entry supersedes an earlier one rather than editing it.

If a number or a status on the page cannot be traced to `GameMasterMod/docs/`
(`STATUS.md`, `EVIDENCE_LEDGER.md`, the current checkpoint), it should not be on the page.

## Structure

`docs/` is the published site and is plain static HTML, CSS and vanilla JS with no build step,
so GitHub Pages serves it as-is. Keep it that way: no bundler, no framework, no `node_modules`.
Fonts come from Google Fonts; everything else is local.

- `docs/index.html` — the single page, one `<section>` per nav entry
- `docs/css/styles.css` — design tokens at `:root`, then section blocks in page order
- `docs/js/main.js` — one IIFE: nav, reveal-on-scroll, "what's new" filters, scroll progress,
  back-to-top, and scroll-spy. Every enhancement degrades to a working static page if JS fails.

## Assets

Icons in `docs/assets/icons/` — see `docs/assets/ATTRIBUTION.txt`.

## Status snapshot

**2026-09-09.** Design phases 1-6 complete; phase 7 complete (**M0 through M8**). The
research profile is feature-complete, the live Workbench bridge is up, the server can write
behind a twelve-point safety model, and the build/validate/pack path exists. Phase 8 is
**retired** — the framework rebuild is cancelled (D-0017); phase 9 is attempting real mod
work through the server and fixing what blocks it.

All five acceptance capabilities are proven. `Sandtable.GroundCheck`, a custom Game Master
context action authored through the tooling, runs in a live session. Handler lint is clean
across 23 files with 17 committed regression tests behind it. Nine skills live in
`.claude/skills/`, mirrored to `.agents/skills/` for the Antigravity runtime.

Not affiliated with Bohemia Interactive. No Bohemia content is redistributed — every index
`reforge-mcp` uses is generated from the user's own installation.
