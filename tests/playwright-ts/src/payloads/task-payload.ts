export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'BLOCKED';

export interface TaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
}

export const TaskPayloads = {
  validTodoTask(): TaskPayload {
    return {
      title: 'Automatizar con Playwright',
      description: 'Caso feliz CRUD desde TypeScript.',
      status: 'TODO'
    };
  },

  updatedInProgressTask(): TaskPayload {
    return {
      title: 'Automatizar con Playwright actualizado',
      description: 'Actualizado por PUT desde TypeScript.',
      status: 'IN_PROGRESS'
    };
  }
};