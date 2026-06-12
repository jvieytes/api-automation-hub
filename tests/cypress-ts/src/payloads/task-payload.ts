import type { TaskStatus } from '../core/types.ts';

export interface TaskPayload {
    title: string;
    description: string;
    status: TaskStatus;
}

export const TaskPayloads = {
    validTodoTask(): TaskPayload {
        return {
            title: 'Automatizar con Cypress',
            description: 'Caso feliz CRUD desde Cypress y TypeScript.',
            status: 'TODO'
        };
    },

    updatedInProgressTask(): TaskPayload {
        return {
            title: 'Automatizar con Cypress actualizado',
            description: 'Actualizado mediante PUT desde Cypress.',
            status: 'IN_PROGRESS'
        };
    }
};