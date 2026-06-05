import type { APIRequestContext, APIResponse } from '@playwright/test';
import { Endpoints } from '../core/endpoints.js';
import type { TaskPayload } from '../payloads/task-payload.js';
import { BaseApiClient } from './base-api-client.js';

export class TaskClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createTask(payload: TaskPayload): Promise<APIResponse> {
    return await this.request.post(Endpoints.tasks, {
      data: payload
    });
  }

  async getTasks(): Promise<APIResponse> {
    return await this.request.get(Endpoints.tasks);
  }

  async getTaskById(taskId: number): Promise<APIResponse> {
    return await this.request.get(Endpoints.taskById(taskId));
  }

  async updateTask(taskId: number, payload: TaskPayload): Promise<APIResponse> {
    return await this.request.put(Endpoints.taskById(taskId), {
      data: payload
    });
  }

  async updateTaskStatus(taskId: number, status: string): Promise<APIResponse> {
    return await this.request.patch(Endpoints.taskStatusById(taskId), {
      data: { status }
    });
  }

  async deleteTask(taskId: number): Promise<APIResponse> {
    return await this.request.delete(Endpoints.taskById(taskId));
  }
}