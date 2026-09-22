import {
  WS_GITHUB_PROJECT_PROVISIONING_CAPABILITY,
  WS_PROJECT_FILE_WATCH_CAPABILITY,
  type NativeApi,
} from "@cortex/contracts";

import {
  createWsNativeApi,
  onWsServerCapabilitiesChange,
  readWsServerCapabilities,
} from "./wsNativeApi";

let cachedInjectedApi: NativeApi | undefined;

export function readNativeApi(): NativeApi | undefined {
  if (typeof window === "undefined") return undefined;
  // Cloud sessions use the WS facade. Keep an explicitly injected NativeApi
  // as a compatibility path for existing transport hosts and test harnesses.
  if (cachedInjectedApi && window.nativeApi === cachedInjectedApi) return cachedInjectedApi;
  if (window.nativeApi) {
    cachedInjectedApi = window.nativeApi;
    return cachedInjectedApi;
  }
  return createWsNativeApi();
}

export function ensureNativeApi(): NativeApi {
  const api = readNativeApi();
  if (!api) {
    throw new Error("Native API not found");
  }
  return api;
}

export function readNativeApiServerCapability(capability: string): boolean {
  if (typeof window === "undefined") return false;
  if (window.nativeApi) {
    if (capability === WS_GITHUB_PROJECT_PROVISIONING_CAPABILITY) {
      return typeof window.nativeApi.projects?.provisionFromGitHub === "function";
    }
    if (capability === WS_PROJECT_FILE_WATCH_CAPABILITY) {
      return typeof window.nativeApi.projects?.onFileChange === "function";
    }
    return false;
  }
  return readWsServerCapabilities()?.includes(capability) === true;
}

export function onNativeApiServerCapabilitiesChange(
  listener: () => void,
  options?: { readonly replayCurrent?: boolean },
): () => void {
  if (typeof window === "undefined") {
    if (options?.replayCurrent) listener();
    return () => undefined;
  }
  if (window.nativeApi) {
    if (options?.replayCurrent) listener();
    return () => undefined;
  }
  return onWsServerCapabilitiesChange(listener, options);
}
