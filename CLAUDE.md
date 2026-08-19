# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**AFC 200** (Alcohol Free Challenge 200) — a 200-day sobriety challenge mobile web app,
in Korean. Users stamp a daily check-in, unlock 8 milestone badges, and follow a
day-by-day body-recovery infographic.

**Shipped and live in production**: https://afc90.vercel.app

The repo and folder are still named `AFC90` (and `origin` is
`github.com/superpjh-stack/AFC90`) — that is deliberate. The challenge was 90 days
until 2026-08-19; only the product name and duration changed, not the repo identity.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
```

There are **no tests, no linter, and no TypeScript**. Verification is by build +
manual/browser check. `npm run build` is the fastest correctness gate.

## Architecture

Vite 5 + React 18 + Tailwind 3, plain JSX. No backend — all state lives in
`localStorage` behind the `useAFC` hook (`src/hooks/useAFC.js`).

- `src/App.jsx` is the only router: a `pageMap` object keyed by **Korean tab names**
  (`홈`/`캘린더`/`신체변화`/`마이페이지`) plus `useState`.
  `react-router-dom` is a dependency but **unused** — do not assume routes exist.
- Screens: `Onboarding` (shown when no profile) → `Dashboard` / `Calendar` /
  `BodyTracker` / `MyPage`, plus `SOSModal` and `BadgeModal`.
- `useAFC` owns profile, check-ins, day number, streak, milestones, and derived stats.

### Single source of truth — read this before editing content

| File | Owns |
|---|---|
| `src/data/challenge.js` | `CHALLENGE_DAYS` (200), `CHALLENGE_NAME`, `MILESTONES` (8), `isMilestoneUnlocked()` |
| `src/data/bodyChanges.js` | `BODY_CHANGES.stages` (6), `getBodyChangeForDay()` |

Before 2026-08-19 the `MILESTONES` array was copy-pasted into **five** files and the
body-change stages into **three**. That was consolidated. **Never reintroduce a local
copy** — import from the two files above. Changing the challenge length means editing
`CHALLENGE_DAYS`, not hunting literals.

### Gotchas

- **The last body-change stage must keep `range: [151, Infinity]`.** Its label reads
  `151-200`, but a hard upper bound breaks the screen for anyone past that day —
  `getStageStatus` marks every stage "completed" and no current stage renders. The old
  `[31, 90]` had exactly this bug from day 91 on.
- **Searching for `90` is half false positives.** Do not touch CSS
  `linear-gradient(90deg, …)`, Tailwind `active:scale-90`, `setTimeout(…, 900)`, or
  line-number references in docs. Legitimate remaining `90`s: the day-90 milestone,
  `range: [31, 90]`, and the `afc90_*` legacy storage keys.
- **`localStorage` keys are `afc200_*`, with a one-time migration from `afc90_*`**
  that runs at module load in `useAFC.js`. Keep it. Renaming keys without a migration
  wipes every existing user's check-in history.

## Deployment

**Vercel is wired to GitHub — pushing deploys.** There is no `vercel` CLI installed and
no `.vercel/` link, and none is needed.

- Push to any branch → Preview deployment. Previews sit behind Vercel SSO, so they are
  only viewable in a browser logged into the Vercel account (anonymous `curl` gets a 302).
- Merge to `main` → **production deploy to https://afc90.vercel.app**. Merging is
  shipping; there is no separate deploy step, and rolling back needs a revert commit.
- `vercel.json` sets the Vite build and an SPA rewrite. Do not add a deploy script.

## progress.md

`progress.md` at the repo root is the resume file for the `/re-begin` command. It holds
what is done, what is next, and accumulated gotchas. **Update it when work meaningfully
advances**, keeping its section structure (`지금까지 끝난 것` / `지금 해야 할 것` /
`알아둘 것`). It is written in Korean, like the rest of the project's docs.

## Planning docs

`docs/intro.md`, `docs/problem.md`, `docs/spec.md` are the product spec, kept current
with the 200-day design. `docs/problem.md` carries the rationale for 200 days over 90,
with sources — update it if the duration ever changes again.

## Historical artifacts — do not act on these

- **`/pdca …` commands do not exist in this environment.** There is no `.bkit/` or
  `.omc/` directory and no pdca command file. Earlier versions of this file described a
  bkit PDCA pipeline; that was never available here.
- `docs/.pdca-status.json`, `docs/.bkit-memory.json`, and
  `docs/03-analysis/AFC90.analysis.md` are leftovers from a previous environment
  (they contain stale Windows paths). They are records, not live state — leave them
  unless explicitly asked to regenerate.
