# Project Sandtable — project site

Static project site for **`reforge-mcp`** — an open-source research and Workbench MCP server
for Arma Reforger / Enfusion. **72 tools, 23 handlers, 385 tests.**

## The goal (D-0017, restated 2026-09-09)

The server is the whole project, and its purpose is **autonomy**: an AI, handed a mod to build,
finishes it with **no human input at any step** — research, authoring, compiling, loading,
running, reading the log, fixing what broke. **The Game Master framework rebuild is cancelled.**
Game Master is the hardest *worked example* to hold that standard against, not a deliverable;
its 14-feature list is a bank of test cases, not a roadmap.

Anywhere a person must still intervene is a **gap in the server**, and the page names those
rather than presenting them as design. There are three today: Steam's custom-arguments prompt,
Workbench dialogs outside the owner's explicit allowlist, and any judgement that can only be
made by watching Play mode.

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
  Sandtable as a product in progress. Game Master is the *hardest worked example*, the F-list
  and the 14 wanted features are a **test-case bank**, and phase 8 is retired.
- **The bar is an unattended build, and the gaps are named.** The page must not describe a
  human-in-the-loop step as intentional polish. Steam's prompt is a security control the
  server will not defeat — say that, and still count it as a gap.
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
  takes the whole bridge down. There are **23** handlers, named `SANDTABLE_WB_*` since
  2026-09-09; the class name is the wire protocol, so renaming one is a protocol change.
- **"What's new" is a build log, not a highlight reel.** Defects found and fixed belong in it
  alongside features; several current entries are bugs, deliberately. Entries are added when
  work lands, each traceable to `EVIDENCE_LEDGER.md`, and **dated entries are not rewritten
  as history moves on** — a later entry supersedes an earlier one rather than editing it.

If a number or a status on the page cannot be traced to something that can be re-run — a test
count, `capabilities`, `diagnose`, a lint pass, an index build stamp — it should not be on the
page. (The old rule pointed at `GameMasterMod/docs/`; that tree was deleted on 2026-09-09, and
a traceability rule aimed at a folder that no longer exists is worse than none.)

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
across 23 files in both trees; suites are 385 green (private) and 366 green with 3 intentional
skips (open source).

The workspace was reorganised on 2026-09-09: the old project tree and both Game Master addons
were deleted, and the config, tests and indexes were repaired to match. The handlers were
renamed `EMCP_WB_*` -> `SANDTABLE_WB_*` at the same time, and that rename is **verified live**
— Workbench launched on the handler addon, the log shows the addon loaded and the script module
compiled with zero errors, and Ping, GetState, Layers, Terrain, Clipboard and ScriptEditor all
answered under their new names.

Repairing the config also surfaced its own bug: a path whose backslashes had been stripped
(`C:Program Files…`) is legal drive-relative syntax on Windows, so the server started normally
with every root silently pointing elsewhere. That is now refused at startup with the cause
named.

Not affiliated with Bohemia Interactive. No Bohemia content is redistributed — every index
`reforge-mcp` uses is generated from the user's own installation.
