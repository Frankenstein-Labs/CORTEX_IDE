<div align="center">
  <img src="./assets/prod/logo.svg" width="112" alt="Cortex logo">
  <h1>Cortex</h1>
  <p><strong>A focused workspace for coding agents.</strong></p>
  <p>
    CORTEX_IDE is a standalone React/Vite workspace for building software with coding agents.<br>
    It brings projects, provider sessions, execution tools, review surfaces, and delivery workflows into one focused environment.
  </p>
  <p>
    <a href="https://github.com/Frankenstein-Labs/CORTEX_IDE/releases/latest">Releases</a>
    &nbsp;·&nbsp;
    <a href="https://www.trycortex.com/">Website</a>
    &nbsp;·&nbsp;
    <a href="https://www.trycortex.com/docs">Documentation</a>
    &nbsp;·&nbsp;
    <a href="./docs/external-mcp.md">MCP integration</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/Frankenstein-Labs/CORTEX_IDE/issues/new/choose">Report an issue</a>
  </p>
</div>

> **CORTEX is created and founded by Abdoulaye Coumbassa Sa.**
>
> The project is built around a simple principle: coding agents should work inside a coherent development environment where context, execution, review, and delivery remain connected.

## Overview

Cortex is a workspace for software development with coding agents. It is designed to keep the complete task lifecycle in view: define the project context, start a provider session, inspect and edit files, run commands, preview changes, review diffs, and deliver the result through Git.

The application is delivered as a standalone React/Vite single-page application. Its interface preserves a focused desktop-style workspace while remaining suitable for Web and Cloud deployment. The existing WebSocket transport connects the frontend to the execution environment without requiring a new or invented CORTEX Cloud backend.

> [!NOTE]
> Cortex is early-stage software. APIs and interface details remain under active development.

## Why Cortex

Cortex treats an agent session as part of a real development workflow rather than as an isolated chat. Projects provide durable context. Threads preserve task history. Workspace tools make execution visible. Review and Git surfaces keep changes accountable before they leave the environment.

This approach reduces the distance between intention and implementation while allowing developers to remain in control of the work performed by their agents.

## Core capabilities

### Projects, threads, and context

Organize work around projects and threads. Projects define the workspace, while threads preserve the task-specific conversation, state, files, and history.

- Project-aware navigation and conversations
- Provider and model selection per task
- Thread history, status, recaps, notes, and side chats
- Search and quick access across active work

### Integrated workspace tools

The tools surrounding an agent session remain available from the same task surface, keeping execution and review connected.

| Surface            | Purpose                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **Changes**        | Inspect diffs, changed files, and review state.                                                   |
| **Terminal**       | Run commands in the project environment.                                                          |
| **Browser**        | Keep local previews next to the thread and let agents use semantic or page-declared WebMCP tools. |
| **Files / Editor** | Browse, inspect, and edit project files in context.                                               |
| **Git**            | Work with branches, commits, pushes, and pull requests.                                           |

### Split views and previews

Keep an active conversation alongside the surface it is changing. Split views, browser previews, and device previews make the result part of the working context.

<p align="center">
  <img src="./assets/prod/readme-split-view-dark.png" width="900" alt="Cortex split view with an agent thread and iOS simulator preview">
</p>

### Provider-native integrations

Cortex connects to coding-agent runtimes that are installed and authenticated locally. The current development build includes the following integrations:

| Runtime         | Local integration                           |
| --------------- | ------------------------------------------- |
| **Codex**       | Codex CLI / app-server                      |
| **Claude**      | Claude Code                                 |
| **Cursor**      | Cursor agent runtime                        |
| **Antigravity** | Antigravity CLI                             |
| **Grok**        | Grok Build                                  |
| **Droid**       | Factory Droid                               |
| **OpenCode**    | OpenCode and its configured model providers |
| **Pi**          | Pi and its configured model providers       |
| **Devin**       | Devin CLI                                   |

### Parallel work and handoffs

Managed worktrees provide a boundary for parallel changes. Handoffs preserve project context when a task needs to continue with another provider or toolchain.

- Run work in a local checkout or an isolated managed worktree
- Keep parallel threads from modifying the same checkout unintentionally
- Hand off a task without losing its place in the workflow
- Review the resulting diff before it leaves the workspace

### Automations and external MCP

Automations support recurring agent runs and keep their outcomes attached to projects and threads. External MCP integrations provide scoped, user-approved access for other local clients.

See [External MCP integrations](./docs/external-mcp.md) for setup, pairing, project access, and permission boundaries.

### Appearance and workspace preferences

Configure the shell to match the way you work with light and dark themes, typography controls, density preferences, and workspace settings.

<p align="center">
  <img src="./assets/prod/readme-appearance-dark.png" width="900" alt="Cortex Appearance settings with theme, typography, and density controls">
</p>

## Architecture at a glance

Cortex is organized around a small set of collaborating layers:

| Layer                 | Responsibility                                                                        |
| --------------------- | ------------------------------------------------------------------------------------- |
| **Frontend**          | React/Vite application, routing, workspace UI, panels, and interaction state.         |
| **Transport**         | Existing WebSocket connection used for requests, events, streaming, and capabilities. |
| **Provider sessions** | Authenticated coding-agent runtimes that execute work for a project or thread.        |
| **Workspace tools**   | Terminal, files, browser, editor, previews, diffs, Git, and pull requests.            |
| **Integrations**      | Scoped automations and external MCP connections with explicit permissions.            |

The Web frontend keeps the established UI and transport contracts. Desktop-specific capabilities are not replaced with an invented cloud service; when a local capability is unavailable, the existing browser fallback or server capability negotiation is used.

## Workflow surfaces

| Workflow          | Included surfaces                                                   |
| ----------------- | ------------------------------------------------------------------- |
| **Workspace**     | Local projects, chats, history, and multiple provider runtimes.     |
| **Execution**     | Terminals, browser previews, files, and editor.                     |
| **Delivery**      | Diffs, Git actions, managed worktrees, and pull requests.           |
| **Orchestration** | Provider handoffs, automations, and scoped external MCP.            |
| **Development**   | Standalone Vite web app with unit, browser, and performance suites. |

## Installation

### Requirements

- [Node.js](https://nodejs.org/) `^22.19 || ^23.11 || >=24.10`
- npm
- A configured and authenticated provider runtime for the session you want to run

### Run from source

```console
git clone https://github.com/Frankenstein-Labs/CORTEX_IDE.git
cd CORTEX_IDE
npm install
npm run dev
```

`npm run dev` serves the application with Vite. `npm run build` produces the production bundle in `dist/`.

### Commands

| Command                        | Purpose                                                               |
| ------------------------------ | --------------------------------------------------------------------- |
| `npm run dev`                  | Start the Vite development server with Fast Refresh.                  |
| `npm run build`                | Build the production application in `dist/`.                          |
| `npm run preview`              | Serve the built application locally.                                  |
| `npm run typecheck`            | Run the TypeScript check across the application and vendored modules. |
| `npm test`                     | Run the unit test suite with Vitest.                                  |
| `npm run test:browser`         | Run the browser suite with Playwright and Vitest.                     |
| `npm run test:browser:install` | Install the Chromium runtime required by browser tests.               |
| `npm run fmt:check`            | Verify formatting with oxfmt.                                         |
| `npm run lint`                 | Run the oxlint static analysis checks.                                |

### Provider setup

Cortex uses the provider installations and subscriptions already configured on the local machine. Install and authenticate the runtime you intend to use before starting a session. For Codex sessions, follow the [Codex CLI setup](https://github.com/openai/codex).

## Project leadership

CORTEX_IDE is created and founded by **Abdoulaye Coumbassa Sa**. The project’s direction is centered on making agent-assisted software development more focused, observable, and accountable from the first instruction to the final pull request.

## Contributing

Bug fixes, reliability improvements, performance work, documentation, and maintenance changes are welcome.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request. For a reproducible problem, [open an issue](https://github.com/Frankenstein-Labs/CORTEX_IDE/issues/new/choose) with the CORTEX_IDE version, operating system, browser, and relevant logs.

## License

Cortex is licensed under the [MIT License](./LICENSE).
