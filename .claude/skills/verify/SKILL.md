# Verify: run CORTEX_IDE locally for runtime verification

How to launch the standalone React/Vite SPA on an isolated development port without touching the default dev port.

## Launch

```bash
cd <repo>
PORT=5899 npm run dev &
```

Then open http://localhost:5899/.

## Gotchas

- `VITE_WS_URL` optionally tells the SPA where an external WebSocket backend lives; leave it unset when only validating the client shell.
- The default Vite port is 5733; use an explicit `PORT` to avoid colliding with another checkout.
- The project picker ("Work in a project") only lists **top-level folders in $HOME** and clicking one selects it as the workspace immediately (no drill-down). To open a test repo, place/symlink it at `~/<name>` temporarily.
- To see diffs: select a git workspace with uncommitted changes, then click the **+N −N** toggle in the top-right chat header — it opens the DiffPanel (working-tree diff). No project/thread needed.
- Run the unit suite with `npm test` and the browser suite with `npm run test:browser`.

## Playwright driving

Chrome extension may be unavailable; Playwright is a root devDependency and can be imported from `node_modules/playwright/index.mjs` in a scratch script.
