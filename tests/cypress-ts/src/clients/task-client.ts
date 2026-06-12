import type {
    ApiEnvelope,
    Task,
    TaskListResponse,
    TaskStatus
} from '../core/types';

import { Endpoints } from '../core/endpoints';
import type { TaskPayload } from '../payloads/task-payload';
import { BaseApiClient } from './base-api-client';

export class TaskClient extends BaseApiClient {
    createTask(
        payload: TaskPayload
    ): Cypress.Chainable<Cypress.Response<ApiEnvelope<Task>>> {
        return this.execute(
            'Create Task',
            'POST',
            Endpoints.tasks,
            payload
        );
    }

    getTasks(): Cypress.Chainable<
        Cypress.Response<ApiEnvelope<TaskListResponse>>
    > {
        return this.execute(
            'Get Tasks',
            'GET',
            Endpoints.tasks
        );
    }

    getTaskById(
        taskId: number
    ): Cypress.Chainable<Cypress.Response<ApiEnvelope<Task>>> {
        return this.execute(
            'Get Task By ID',
            'GET',
            Endpoints.taskById(taskId)
        );
    }

    updateTask(
        taskId: number,
        payload: TaskPayload
    ): Cypress.Chainable<Cypress.Response<ApiEnvelope<Task>>> {
        return this.execute(
            'Update Task',
            'PUT',
            Endpoints.taskById(taskId),
            payload
        );
    }

    updateTaskStatus(
        taskId: number,
        status: TaskStatus
    ): Cypress.Chainable<Cypress.Response<ApiEnvelope<Task>>> {
        return this.execute(
            'Update Task Status',
            'PATCH',
            Endpoints.taskStatusById(taskId),
            { status }
        );
    }

    deleteTask(
        taskId: number
    ): Cypress.Chainable<Cypress.Response<ApiEnvelope<Task>>> {
        return this.execute(
            'Delete Task',
            'DELETE',
            Endpoints.taskById(taskId)
        );
    }
}