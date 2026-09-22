# AGENTS.md

## Task Completion Requirements

- Do not run `npm run fmt`, `npm run lint`, or `npm run typecheck` unless the user explicitly asks for them in the current conversation.
- All of `npm run fmt`, `npm run lint`, and `npm run typecheck` must pass before considering tasks completed.
- Treat `npm run fmt`, `npm run lint`, and `npm run typecheck` as heavyweight checks: bundle them into one final verification pass per task whenever possible, and avoid rerunning the full set repeatedly during iteration.
- If a user asks for a small follow-up right after a recent full verification pass, prefer no rerun or the smallest reasonable re-check unless the user explicitly asks for full validation again.
- If the user asks to focus on code only, do not run `npm run fmt`, `npm run lint`, or `npm run typecheck` automatically. In that mode, make the code changes first and only run verification if the user explicitly asks for it.
- NEVER run a bare `vitest`. Always use `npm test` (runs Vitest via `vitest run`).

## Project Snapshot

Cortex is a minimal web GUI for using coding agents like Codex and Claude.

This repository is a standalone single-page web app: React 19 + Vite + TanStack
Router at the repository root, with Fast Refresh, Tailwind v4, and Vitest. It was
previously a TypeScript monorepo; the workspace structure, the Electron desktop
shell, and the local server/CLI have been removed.

This repository is a VERY EARLY WIP. Proposing sweeping changes that improve long-term maintainability is encouraged.

## Core Priorities

1. Performance first.
2. Reliability first.
3. Keep behavior predictable under load and during failures (session restarts, reconnects, partial streams).

If a tradeoff is required, choose correctness and robustness over short-term convenience.

## Maintainability

Long term maintainability is a core priority. If you add new functionality, first check if there is shared logic that can be extracted to a separate module. Duplicate logic across multiple files is a code smell and should be avoided. Don't be afraid to change existing code. Don't take shortcuts by just adding local logic to solve a problem.

## UI Conventions

### Open/close (toggle) animations — single source

Any UI element with an open/close toggle (expand/collapse, show/hide, disclosure) MUST reuse the shared disclosure motion in `src/lib/disclosureMotion.ts`. Never write bespoke height/opacity transitions or one-off `@keyframes` for a toggle — use the same logic and the same functions everywhere so every toggle feels identical (220ms `ease-out`, with `motion-reduce` fallbacks).

- Shell + content (used by open/close project, sidebar sections, composer suggestions): `disclosureShellClassName(open)` on the grid shell, `DISCLOSURE_INNER_CLASS` on the inner wrapper, `disclosureContentClassName(open)` on the content — or the ready-made `DisclosureRegion` component (`src/components/ui/DisclosureRegion.tsx`).
- Base UI `<Collapsible>` panels: wrap with `CollapsiblePanel` (`src/components/ui/collapsible.tsx`), which applies `DISCLOSURE_COLLAPSIBLE_PANEL_CLASS`.
- Rotating chevron affordance: `DisclosureChevron` / `disclosureChevronClassName(open)`.

Reference usage: opening/closing a project and the sidebar sections in `src/components/Sidebar.tsx`. If you find a toggle that animates differently, migrate it to this module rather than duplicating logic.

## Directory Roles

- `src`: React/Vite UI. Owns session UX, conversation/event rendering, and client-side state. Talks to the local Cortex runtime over WebSocket.
- `contracts/src`: effect/Schema schemas and TypeScript contracts for provider events, WebSocket protocol, and model/session types. Imports as `@cortex/contracts`. Keep this schema-only — no runtime logic.
- `shared/src`: Runtime utilities shared with the Cortex runtime. Imports as `@cortex/shared/<module>` (explicit subpath per module) — no barrel index.
- `perf`: Browser performance harnesses and profiling entry points (`perf/vite.config.ts` builds them).
- `tooling`: Standalone Node scripts that are not part of the app bundle.

## Local Dev

- `npm run dev` starts the Vite dev server.
- `npm test` runs the unit suite; `npm run test:browser` runs the Playwright-backed browser suite (install Chromium once with `npm run test:browser:install`).
- Path aliases: `~/*` → `src/*`, plus `@cortex/contracts` and `@cortex/shared/*` mapped to the vendored `contracts/` and `shared/` trees. Add new mappings to `tsconfig.json` and to the Vitest aliases when you vendor another module.

## Codex App Server (Important)

Cortex is currently Codex-first. The local Cortex runtime starts `codex app-server` (JSON-RPC over stdio) per provider session, then streams structured events to the browser through WebSocket push messages. The web app consumes orchestration domain events via WebSocket push on channel `orchestration.domainEvent`.

Docs:

- Codex App Server docs: https://developers.openai.com/codex/sdk/#app-server

## Reference Repos

- Open-source Codex repo: https://github.com/openai/codex
- Codex-Monitor (Tauri, feature-complete, strong reference implementation): https://github.com/Dimillian/CodexMonitor

Use these as implementation references when designing protocol handling, UX flows, and operational safeguards.
