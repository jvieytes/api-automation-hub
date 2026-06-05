import type { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { Endpoints } from '../core/endpoints.js';
import type { TaskPayload } from '../payloads/task-payload.js';
import { BaseApiClient } from './base-api-client.js';

export class TaskClient extends BaseApiClient {
  constructor(request: APIRequestContext, testInfo: TestInfo) {
    super(request, testInfo);
  }

  async createTask(payload: TaskPayload): Promise<APIResponse> {
    await this.attachRequest('Create Task', 'POST', Endpoints.tasks, payload);

    const response = await this.request.post(Endpoints.tasks, {
      data: payload
    });

    await this.attachResponse('Create Task', response);
    return response;
  }

  async getTasks(): Promise<APIResponse> {
    await this.attachRequest('Get Tasks', 'GET', Endpoints.tasks);

    const response = await this.request.get(Endpoints.tasks);

    await this.attachResponse('Get Tasks', response);
    return response;
  }

  async getTaskById(taskId: number): Promise<APIResponse> {
    const endpoint = Endpoints.taskById(taskId);

    await this.attachRequest('Get Task By ID', 'GET', endpoint);

    const response = await this.request.get(endpoint);

    await this.attachResponse('Get Task By ID', response);
    return response;
  }

  async updateTask(taskId: number, payload: TaskPayload): Promise<APIResponse> {
    const endpoint = Endpoints.taskById(taskId);

    await this.attachRequest('Update Task', 'PUT', endpoint, payload);

    const response = await this.request.put(endpoint, {
      data: payload
    });

    await this.attachResponse('Update Task', response);
    return response;
  }

  async updateTaskStatus(taskId: number, status: string): Promise<APIResponse> {
    const endpoint = Endpoints.taskStatusById(taskId);
    const payload = { status };

    await this.attachRequest('Update Task Status', 'PATCH', endpoint, payload);

    const response = await this.request.patch(endpoint, {
      data: payload
    });

    await this.attachResponse('Update Task Status', response);
    return response;
  }

  async deleteTask(taskId: number): Promise<APIResponse> {
    const endpoint = Endpoints.taskById(taskId);

    await this.attachRequest('Delete Task', 'DELETE', endpoint);

    const response = await this.request.delete(endpoint);

    await this.attachResponse('Delete Task', response);
    return response;
  }
}