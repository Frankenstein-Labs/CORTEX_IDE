/**
 * Provider-neutral contracts for the new web platform runtime.
 *
 * These contracts intentionally do not reference Codex, Claude, Cursor,
 * Electron, local processes, SQLite, or any specific execution vendor.
 */

export type Brand<T, Name extends string> = T & { readonly __brand: Name };

export type UserId = Brand<string, "UserId">;
export type OrganizationId = Brand<string, "OrganizationId">;
export type ProjectId = Brand<string, "ProjectId">;
export type WorkspaceId = Brand<string, "WorkspaceId">;
export type TaskId = Brand<string, "TaskId">;
export type AgentRunId = Brand<string, "AgentRunId">;
export type ToolCallId = Brand<string, "ToolCallId">;
export type EventId = Brand<string, "EventId">;
export type ArtifactId = Brand<string, "ArtifactId">;

export type IsoTimestamp = string;

export type TaskStatus =
  | "queued"
  | "planning"
  | "running"
  | "waiting_for_approval"
  | "paused"
  | "succeeded"
  | "failed"
  | "cancelled";

export type WorkspaceStatus = "creating" | "ready" | "stopping" | "stopped" | "failed";

export type RiskLevel = "read" | "write" | "execute" | "network" | "destructive";

export interface Project {
  readonly id: ProjectId;
  readonly organizationId: OrganizationId;
  readonly name: string;
  readonly repositoryUrl: string | null;
  readonly defaultBranch: string | null;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface Workspace {
  readonly id: WorkspaceId;
  readonly projectId: ProjectId;
  readonly provider: string;
  readonly status: WorkspaceStatus;
  readonly repositoryRef: string | null;
  readonly snapshotRef: string | null;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface Task {
  readonly id: TaskId;
  readonly projectId: ProjectId;
  readonly workspaceId: WorkspaceId | null;
  readonly title: string;
  readonly prompt: string;
  readonly status: TaskStatus;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface AgentRun {
  readonly id: AgentRunId;
  readonly taskId: TaskId;
  readonly status: TaskStatus;
  readonly model: string;
  readonly stepCount: number;
  readonly startedAt: IsoTimestamp | null;
  readonly completedAt: IsoTimestamp | null;
  readonly error: string | null;
}

export interface PlanStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: "pending" | "active" | "completed" | "failed" | "skipped";
  readonly risk: RiskLevel;
}

export interface AgentPlan {
  readonly runId: AgentRunId;
  readonly summary: string;
  readonly steps: readonly PlanStep[];
  readonly version: number;
}

export interface ToolDefinition {
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly risk: RiskLevel;
  readonly requiresApproval: boolean;
}

export interface ToolCall {
  readonly id: ToolCallId;
  readonly runId: AgentRunId;
  readonly toolName: string;
  readonly input: unknown;
  readonly status: "requested" | "approved" | "rejected" | "running" | "succeeded" | "failed";
  readonly requestedAt: IsoTimestamp;
  readonly completedAt: IsoTimestamp | null;
}

export type ExecutionEvent =
  | {
      readonly type: "task.created";
      readonly task: Task;
    }
  | {
      readonly type: "run.started";
      readonly run: AgentRun;
    }
  | {
      readonly type: "plan.updated";
      readonly plan: AgentPlan;
    }
  | {
      readonly type: "tool.requested";
      readonly call: ToolCall;
    }
  | {
      readonly type: "tool.output";
      readonly callId: ToolCallId;
      readonly output: unknown;
    }
  | {
      readonly type: "approval.required";
      readonly call: ToolCall;
      readonly reason: string;
    }
  | {
      readonly type: "run.completed";
      readonly run: AgentRun;
    }
  | {
      readonly type: "run.failed";
      readonly runId: AgentRunId;
      readonly message: string;
    };

export interface PlatformEventEnvelope {
  readonly id: EventId;
  readonly sequence: number;
  readonly occurredAt: IsoTimestamp;
  readonly event: ExecutionEvent;
}

export interface CreateTaskInput {
  readonly projectId: ProjectId;
  readonly prompt: string;
  readonly title?: string;
}

export interface CreateTaskResponse {
  readonly task: Task;
  readonly run: AgentRun;
}

export interface PlatformError {
  readonly code: string;
  readonly message: string;
  readonly retryable: boolean;
}

export const PLATFORM_PROTOCOL_VERSION = 1;

export function isTerminalTaskStatus(status: TaskStatus): boolean {
  return status === "succeeded" || status === "failed" || status === "cancelled";
}
