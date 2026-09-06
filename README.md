# NEWGAMEMASTER — Project site

Static roadmap and project explanation site for:

- **NEWGAMEMASTER** — extensible live Game Master / “live 3DEN” framework for Arma Reforger
- **reforge-mcp** — research + Workbench MCP server that drives the build

The live site lives in **`docs/`** so GitHub Pages can deploy from **branch `main` → folder `/docs`**.

## Preview locally

```powershell
cd docs
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Push to GitHub

Repo: https://github.com/WannabeCoderLuc/REFORGE-MCP-GameMaster-Reforged

```powershell
cd "C:\Users\Luc\Desktop\Arma ReforgerMOD\MCP&&GAMEMASTER"
git init
git add .
git commit -m "Add NEWGAMEMASTER roadmap site under docs/"
git branch -M main
git remote add origin https://github.com/WannabeCoderLuc/REFORGE-MCP-GameMaster-Reforged.git
git push -u origin main
```

Pages is already set to **Deploy from a branch → `main` / `/docs`**. After the push, the site will be at:

https://wannabecoderluc.github.io/REFORGE-MCP-GameMaster-Reforged/

## Assets

Icons in `docs/assets/icons/` — see `docs/assets/ATTRIBUTION.txt`.

## Status snapshot

Reflects project status as of **2026-09-06**: design phases 1–6 complete, Phase 7 scaffolding in progress, reforge-mcp v0.1.0 with M0 + M2 done.
