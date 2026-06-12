export const Endpoints = {
  health: '/health',
  docs: '/docs/',
  testReset: '/api/v1/test/reset',
  tasks: '/api/v1/tasks',

  taskById: (taskId: number): string =>
    `/api/v1/tasks/${taskId}`,

  taskStatusById: (taskId: number): string =>
    `/api/v1/tasks/${taskId}/status`
} as const;