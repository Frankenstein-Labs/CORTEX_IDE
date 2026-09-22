<div align="center">
  <img src="./assets/prod/logo.svg" width="112" alt="Cortex logo">
  <h1>Cortex</h1>
  <p><strong>A focused workspace for coding agents.</strong><br>
  Projects, provider sessions, execution surfaces, and review tools in one local-first web app.</p>
  <p>
    <a href="https://github.com/Emanuele-web04/cortex/releases/latest">Download</a>
    &nbsp;·&nbsp;
    <a href="https://www.trycortex.com/">Website</a>
    &nbsp;·&nbsp;
    <a href="https://www.trycortex.com/docs">Documentation</a>
    &nbsp;·&nbsp;
    <a href="./docs/external-mcp.md">MCP integration</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/Emanuele-web04/cortex/issues/new/choose">Report an issue</a>
  </p>
</div>

<details>
  <summary><strong>Table of contents</strong></summary>

| Workspace layer      | Responsibility                                                |
| -------------------- | ------------------------------------------------------------- |
| **Project**          | Repository context, settings, and related work.               |
| **Thread**           | Task-specific conversation, state, files, and history.        |
| **Provider session** | The authenticated coding-agent runtime executing the task.    |
| **Workspace tools**  | Changes, terminal, browser, files, editor, previews, and Git. |

> [!NOTE]
> Cortex is early-stage software. APIs and interface details remain under active development.

## Capabilities

### 1. Projects, threads, and context

Organize work around projects and threads. Projects define the workspace; threads preserve the task-specific conversation, state, files, and history.

- Project-aware navigation and conversations
- Provider and model selection per task
- Thread history, status, recaps, notes, and side chats
- Search and quick access across active work

### 2. Integrated workspace tools

The tools surrounding an agent session remain available from the same task surface, keeping execution and review connected.

| Surface            | Purpose                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **Changes**        | Inspect diffs, changed files, and review state.                                                   |
| **Terminal**       | Run commands in the project environment.                                                          |
| **Browser**        | Keep local previews next to the thread and let agents use semantic or page-declared WebMCP tools. |
| **Files / Editor** | Browse, inspect, and edit project files in context.                                               |
| **Git**            | Work with branches, commits, pushes, and pull requests.                                           |

### 3. Split views and previews

Keep an active conversation alongside the surface it is changing. Split views, browser previews, and device previews make the result part of the working context.

<p align="center">
  <img src="./assets/prod/readme-split-view-dark.png" width="900" alt="Cortex split view with an agent thread and iOS simulator preview">
</p>

### 4. Provider-native integrations

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

### 5. Isolated parallel work

Managed worktrees provide a boundary for parallel changes. Handoffs preserve project context when a task needs to continue with another provider or toolchain.

- Run work in a local checkout or an isolated managed worktree
- Keep parallel threads from modifying the same checkout unintentionally
- Hand off a task without losing its project context
- Review the resulting diff before it leaves the workspace

### 6. Automations and external MCP

Automations support recurring agent runs and keep their outcomes attached to projects and threads. External MCP integrations provide scoped, user-approved access for other local clients.

See [External MCP integrations](./docs/external-mcp.md) for setup, pairing, project access, and permission boundaries.

### 7. Appearance and workspace preferences

Configure the shell to match the way you work with light and dark themes, typography controls, density preferences, and workspace settings.

<p align="center">
  <img src="./assets/prod/readme-appearance-dark.png" width="900" alt="Cortex Appearance settings with theme, typography, and density controls">
</p>

### Additional capabilities

| Workflow          | Included surfaces                                               |
| ----------------- | --------------------------------------------------------------- |
| **Workspace**     | Local projects, chats, history, and multiple provider runtimes. |
| **Execution**     | Terminals, browser previews, files, and editor.                 |
| **Delivery**      | Diffs, Git actions, managed worktrees, and pull requests.       |
| **Orchestration** | Provider handoffs, automations, and scoped external MCP.        |
| **Development**   | Standalone Vite web app with unit, browser, and perf suites.    |

## Installation

### Run from source

The checkout uses [Node.js](https://nodejs.org/) `^22.19 || ^23.11 || >=24.10` and npm.

```console
git clone https://github.com/Frankenstein-Labs/CORTEX_IDE.git
cd CORTEX_IDE
npm install
npm run dev
```

`npm run dev` serves the app with Vite; `npm run build` produces the production
bundle in `dist/`.

| Command                | Purpose                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run dev`          | Vite dev server with Fast Refresh.                                                              |
| `npm run build`        | Production build to `dist/`.                                                                    |
| `npm run preview`      | Serve the built bundle locally.                                                                 |
| `npm run typecheck`    | TypeScript check across the app and vendored modules.                                           |
| `npm test`             | Unit test suite (Vitest).                                                                       |
| `npm run test:browser` | Browser suite (Playwright + Vitest); install Chromium once with `npm run test:browser:install`. |
| `npm run fmt:check`    | Format check (oxfmt).                                                                           |
| `npm run lint`         | Lint (oxlint).                                                                                  |

### Provider setup

Cortex uses the provider installations and subscriptions already configured on the local machine. Install and authenticate the runtime you intend to use before starting a session. For Codex sessions, follow the [Codex CLI setup](https://github.com/openai/codex).

## Contributing

Bug fixes, reliability improvements, performance work, documentation, and maintenance changes are welcome.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request. For a reproducible problem, [open an issue](https://github.com/Emanuele-web04/cortex/issues/new/choose) with the Cortex version, operating system, runtime, and relevant logs.

## License

Cortex is licensed under the [MIT License](./LICENSE).
