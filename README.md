# NEWGAMEMASTER — Project site

Static roadmap and project explanation site for:

- **NEWGAMEMASTER** — extensible live Game Master / “live 3DEN” framework for Arma Reforger
- **reforge-mcp** — research + Workbench MCP server that drives the build

Content is distilled from the preparation docs (read-only sources under `GameMasterMod/NEWGAMEMASTER` and `GameMasterMod/NEWMCPSERVER`). This folder is the GitHub-hostable website only.

## Preview locally

Open `index.html` in a browser, or from this folder:

```bash
# Python
python -m http.server 8080

# Node
npx --yes serve .
```

Then visit `http://localhost:8080`.

## Host on GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Push the contents of **this folder** to the repo root (or to a `docs/` folder).
3. In the repo: **Settings → Pages → Build and deployment**.
4. Set source to **Deploy from a branch**.
5. Choose branch `main` (or `gh-pages`) and folder `/` (or `/docs`).
6. Save. The site will be at `https://<user>.github.io/<repo>/`.

A `.nojekyll` file is included so GitHub Pages serves assets without Jekyll processing.

### Optional: project site URL

If the repo is named `<user>.github.io`, push these files to the root of that repo for a root-domain Pages site.

## Assets

Icons live in `assets/icons/` — see `assets/ATTRIBUTION.txt`. SunGraphica / GameDevMarket packs were not bundled (licence unsuitable for a public open-source Pages repo).

## Status snapshot

Reflects project status as of **2026-09-06**: design phases 1–6 complete, Phase 7 scaffolding in progress, reforge-mcp v0.1.0 with M0 + M2 done.
