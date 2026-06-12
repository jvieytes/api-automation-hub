export interface ApiEnvelope<T> {
    code?: string;
    message?: string;
    response: T;
}

export type TaskStatus =
    | 'TODO'
    | 'IN_PROGRESS'
    | 'DONE';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}

export interface TaskListResponse {
    total: number;
    items: Task[];
}

export interface ResetResponse {
    total: number;
}

export interface HealthResponse {
    status: string;
    service: string;
}