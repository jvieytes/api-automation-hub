export interface ApiEnvelope<T> {
  code?: string;
  message?: string;
  response: T;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
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