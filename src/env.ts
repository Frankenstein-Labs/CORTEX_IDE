/**
 * Web runtime marker.
 *
 * Keep this compatibility export for UI modules that still use the historical
 * flag, but do not infer a runtime from injected preload globals. The cloud
 * frontend is a regular browser application and uses the WebSocket facade.
 */
export const isElectron = false;
