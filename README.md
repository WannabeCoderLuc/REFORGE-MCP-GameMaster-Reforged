# NEWGAMEMASTER — project site

Static roadmap and project-explanation site for two related, in-progress projects:

- **reforge-mcp** — an open-source research + Workbench MCP server for Arma Reforger /
  Enfusion. **Being built now.**
- **NEWGAMEMASTER** — a planned extensible live Game Master framework ("live 3DEN" as a
  research ambition, not a feature-parity promise). **Designed, not yet implemented.**

The server is deliberately built first, then used to build the framework.

The live site lives in `docs/`.

## What the site claims, and what is actually true

The site is a status page, not marketing, and it is written to stay honest as the work
moves. When updating it, keep these distinctions intact:

- **reforge-mcp exists and runs.** Milestones M0-M6 are complete: 56 tools under the
  `workbench` profile (23 of them writers), 20 under `research` with none, 274 tests green.
  The figures quoted on the page are measured against Arma Reforger build 24903726.
- **The framework does not exist yet.** Phase 8 has not started. The extension contract is
  specified and the F-1..F-15 build list is written, but no framework code has shipped.
- **The three "novel capabilities"** — concurrent multi-GM editing, multi-step undo/redo in
  a live session, and live triggers — are *targets*, and the highest-risk work in the
  project. They are not implemented and are not promised.
- **Tools listed as "planned" on the page must stay visibly planned.** The tool section
  separates what ships today from what is designed but unbuilt; do not merge the two.

If a number or a status on the page cannot be traced to `GameMasterMod/NEWGAMEMASTER/`
(`STATUS.md`, `EVIDENCE_LEDGER.md`, the current checkpoint), it should not be on the page.

## Assets

Icons in `docs/assets/icons/` — see `docs/assets/ATTRIBUTION.txt`.

## Status snapshot

**2026-09-07.** Design phases 1-6 complete. Phase 7 (code scaffolding) in progress:
`reforge-mcp` with **M0 through M6 complete** — the research profile is feature-complete,
the live Workbench bridge is up, and the server can write behind a twelve-point safety
model. Every writer the spec lists now exists except `mod_build`, which is deferred on
purpose: no engine handler exists for it. Framework implementation (Phase 8) has not begun.

Not affiliated with Bohemia Interactive. No Bohemia content is redistributed — every index
`reforge-mcp` uses is generated from the user's own installation.
