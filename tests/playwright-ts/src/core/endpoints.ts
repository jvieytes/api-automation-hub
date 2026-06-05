export const Endpoints = {
  health: '/health',
  docs: '/docs/',
  testReset: '/api/v1/test/reset',
  tasks: '/api/v1/tasks',

  taskById: (id: number): string => `/api/v1/tasks/${id}`,
  taskStatusById: (id: number): string => `/api/v1/tasks/${id}/status`
} as const;