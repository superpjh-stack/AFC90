# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This is a fresh **Dynamic-level** project workspace in **Phase 1 (Planning)**. No source code exists yet — the workspace is in initial setup. Start by defining the feature or project goal with `/pdca plan {feature}`.

## Workflow

This project uses the **bkit PDCA pipeline** with the Dynamic template:

- `/pdca plan` → define requirements and scope
- `/pdca design` → create design documents in `docs/`
- `/pdca do` → implement
- `/pdca analyze` → gap analysis (target ≥ 90% match rate)
- `/pdca iterate` → auto-fix if < 90%
- `/pdca report` → completion report

Check current phase at any time with `/pdca status`.

## Workspace Layout

- `docs/` — PDCA design documents and status tracking (`.pdca-status.json`)
- `.bkit/` — bkit agent orchestration state
- `.omc/` — oh-my-claudecode runtime state
- `.claude/settings.local.json` — local tool permissions

## Agent Orchestration

CTO-led multi-agent mode is configured (`ctoAgent: opus`, `orchestrationPattern: leader`). Start a team session with `/pdca team {feature}` to engage the full agent fleet.
