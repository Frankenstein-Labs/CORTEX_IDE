import type {
  AgentRun,
  AgentRunId,
  CreateTaskInput,
  CreateTaskResponse,
  ExecutionEvent,
  PlatformEventEnvelope,
  Project,
  Task,
  TaskId,
} from "@cortex/platform-contracts";

export interface PlatformClientConfig {
  readonly baseUrl?: string;
  readonly fetch?: typeof globalThis.fetch;
  readonly token?: string;
}

export interface PlatformClient {
  listProjects(): Promise<readonly Project[]>;
  createTask(input: CreateTaskInput): Promise<CreateTaskResponse>;
  getTask(taskId: TaskId): Promise<{ readonly task: Task; readonly run: AgentRun | null }>;
  approveToolCall(runId: AgentRunId, toolCallId: string): Promise<void>;
  subscribeToRun(
    runId: AgentRunId,
    handlers: {
      readonly onEvent: (event: PlatformEventEnvelope) => void;
      readonly onError?: (error: Error) => void;
    },
  ): () => void;
}

function resolveBaseUrl(configured?: string): string {
  if (configured) return configured.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "http://localhost:3000";
}

function createRequest(config: PlatformClientConfig, init?: RequestInit): RequestInit {
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (init?.body) headers.set("Content-Type", "application/json");
  if (config.token) headers.set("Authorization", `Bearer ${config.token}`);
  return { ...init, headers };
}

function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    return response
      .json()
      .catch(() => ({ message: `Platform request failed with ${response.status}` }))
      .then((body: { message?: string }) => {
        throw new Error(body.message ?? `Platform request failed with ${response.status}`);
      });
  }
  return response.json() as Promise<T>;
}

export function createPlatformClient(config: PlatformClientConfig = {}): PlatformClient {
  const baseUrl = resolveBaseUrl(config.baseUrl);
  const requestFetch = config.fetch ?? globalThis.fetch.bind(globalThis);

  const request = async <T>(path: string, init?: RequestInit): Promise<T> =>
    parseJson<T>(await requestFetch(`${baseUrl}${path}`, createRequest(config, init)));

  return {
    listProjects: () => request<readonly Project[]>("/api/platform/projects"),
    createTask: (input) =>
      request<CreateTaskResponse>("/api/platform/tasks", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    getTask: (taskId) =>
      request<{ readonly task: Task; readonly run: AgentRun | null }>(
        `/api/platform/tasks/${taskId}`,
      ),
    approveToolCall: async (runId, toolCallId) => {
      await request<void>(`/api/platform/runs/${runId}/tool-calls/${toolCallId}/approve`, {
        method: "POST",
      });
    },
    subscribeToRun: (runId, handlers) => {
      const source = new EventSource(`${baseUrl}/api/platform/runs/${runId}/events`);
      const onMessage = (message: MessageEvent<string>) => {
        try {
          handlers.onEvent(JSON.parse(message.data) as PlatformEventEnvelope);
        } catch (error) {
          handlers.onError?.(error instanceof Error ? error : new Error("Invalid platform event"));
        }
      };
      const onError = () => handlers.onError?.(new Error("Platform event stream disconnected"));
      source.addEventListener("message", onMessage);
      source.addEventListener("error", onError);
      return () => {
        source.removeEventListener("message", onMessage);
        source.removeEventListener("error", onError);
        source.close();
      };
    },
  };
}

export type PlatformRunEvent = ExecutionEvent;
