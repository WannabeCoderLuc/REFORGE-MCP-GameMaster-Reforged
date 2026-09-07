# Project Sandtable — project site

Static roadmap and project-explanation site for two related, in-progress projects:

- **reforge-mcp** — an open-source research + Workbench MCP server for Arma Reforger /
  Enfusion. **The primary deliverable.** M0–M8 complete: 59 tools, 306 tests.
- **Project Sandtable** — an extensible live Game Master framework ("live 3DEN" as a research
  ambition, not a feature-parity promise). **Spine built and proven in a live world; the
  thirteen features are ahead.**

The server leads, and that ordering is deliberate rather than incidental: Reforger's shipped
API documentation is two engine versions behind, cannot be regenerated on current Tools
builds, and gets some core editor inheritance backwards — so the instrument gets built before
the thing it measures. The framework is both the server's purpose and its hardest test case.

The server is also useful entirely on its own. It knows nothing about Sandtable; it answers
questions about Enfusion, and any Reforger modder can adopt it without the framework.

The live site lives in `docs/`.

## What the site claims, and what is actually true

The site is a status page, not marketing, and it is written to stay honest as the work
moves. When updating it, keep these distinctions intact:

- **reforge-mcp exists and runs.** Milestones M0-M6 are complete: 58 tools under the
  `workbench` profile (25 of them writers), 20 under `research` with none, 296 tests green.
  The figures quoted on the page are measured against Arma Reforger build 24903726.
- **The framework does not exist yet.** Phase 8 has not started. The extension contract is
  specified and the F-1..F-15 build list is written, but no framework code has shipped.
- **The three "novel capabilities"** — concurrent multi-GM editing, multi-step undo/redo in
  a live session, and live triggers — are *targets*, and the highest-risk work in the
  project. They are not implemented and are not promised.
- **Tools listed as "planned" on the page must stay visibly planned.** The tool section
  separates what ships today from what is designed but unbuilt; do not merge the two.
- **The handlers section explains the bridge, not the tooling.** It is the part readers ask
  about most: how a program outside the game drives the editor inside it. Keep it conceptual —
  no code, no file paths — and keep the honest cost in it, including that one bad handler edit
  takes the whole bridge down.
- **"What's new" is a build log, not a highlight reel.** Defects found and fixed belong in it
  alongside features. Three of the current entries are bugs; that is deliberate. Entries are
  added when work lands, and each one should be traceable to `EVIDENCE_LEDGER.md`.

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

**2026-09-07.** Design phases 1-6 complete. Phase 7 (code scaffolding) in progress:
`reforge-mcp` with **M0 through M6 complete** — the research profile is feature-complete,
the live Workbench bridge is up, and the server can write behind a twelve-point safety
model, drive the editor process itself, and clear the modal dialogs that block its automation
bridge. Every writer the spec lists now exists except `mod_build`, which is deferred on
purpose: no engine handler exists for it. Framework implementation (Phase 8) has not begun.

Not affiliated with Bohemia Interactive. No Bohemia content is redistributed — every index
`reforge-mcp` uses is generated from the user's own installation.
