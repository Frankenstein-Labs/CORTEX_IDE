# CORTEX Web/Cloud — rapport de migration technique

## Périmètre

Cette migration concerne exclusivement l’architecture d’exécution du frontend. Le branding CORTEX, les logos, les couleurs, la typographie, les design tokens, les textes de marque, le routing, les composants et les panneaux existants sont inchangés.

Aucun backend CORTEX Cloud n’a été inventé et aucun contrat WebSocket n’a été modifié. Le contrat UI `NativeApi` reste utilisé comme façade afin de préserver les panels Terminal, Files, Git, Diff, PR, Browser, MCP et Agents.

## Changements appliqués

| Zone | Changement | Effet |
| --- | --- | --- |
| `src/nativeApi.ts` | Le frontend utilise l’adaptateur `createWsNativeApi()` par défaut ; une API explicitement injectée reste acceptée comme compatibilité de transport existante. | Le chemin Cloud ne requiert aucun preload, sans casser les hôtes qui fournissent déjà le contrat `NativeApi`. |
| `src/lib/wsHttpUrl.ts` | Conservation de `desktopBridge.getWsUrl()` comme source d’endpoint WS existante, avec `VITE_WS_URL` comme source Web/Cloud et l’origine de page en dernier recours. | Les téléchargements et previews HTTP suivent le transport configuré et conservent les tokens existants. |
| `src/main.tsx` | Suppression de l’initialisation de fenêtre Electron, de la détection macOS et des attributs de fenêtre transparente. | Le bootstrap est celui d’une SPA Web standard. |
| `src/env.ts` | Le marqueur historique `isElectron` est conservé uniquement pour compatibilité de compilation, mais ne détecte plus de preload. Il vaut toujours `false` dans le frontend Web. | Les branches d’interface spécifiques desktop ne s’activent pas dans le build Web. |
| `src/storageOriginMigration.ts` | Conservation de l’importeur de snapshot validé, mais suppression de la lecture/acknowledgement automatique via `desktopBridge.storageMigration`. | Le stockage courant reste attaché à l’origine Web ; aucun accès local/preload implicite. |

## Transport et configuration

Le transport WebSocket existant est conservé. Le frontend doit recevoir l’endpoint via `VITE_WS_URL` lorsque le serveur WebSocket n’est pas servi sur l’origine de la page. Le protocole `ws:`/`wss:` est converti en `http:`/`https:` uniquement pour les URLs HTTP dérivées, sans modifier les routes ou les tokens existants.

Aucune URL de marque ou de produit n’a été modifiée. Les références existantes à `trycortex.com`, `www.trycortex.com`, GitHub et aux autres services restent intactes. Aucune nouvelle URL n’a été inventée.

## Vestiges explicitement conservés

Certains fichiers et types portant encore les noms `desktop`, `nativeApi` ou `desktopBridge` existent dans le checkout et sont référencés par des composants historiques ou des tests. Ils restent présents comme couche de compatibilité de code. Le chemin Web n’active pas les contrôles de fenêtre ni la migration de stockage preload. Les supprimer complètement nécessiterait une décision de contrat pour chaque capacité locale (sélecteur de dossier, notifications système, mise à jour desktop et révélation de fichiers).

Ces capacités ne sont pas remplacées par un backend Cloud fictif. Lorsqu’elles ne sont pas disponibles, les fallbacks navigateur déjà présents sont utilisés.

## Vérifications

La validation finale doit être exécutée après installation des dépendances :

```console
npm ci
npm run typecheck
npm run build
npm test
```

L’audit initial a confirmé que `package.json` décrit déjà une SPA Vite (`npm run dev`, `npm run build`, `npm run preview`) et que l’adaptateur WebSocket existe dans `src/wsNativeApi.ts`.
