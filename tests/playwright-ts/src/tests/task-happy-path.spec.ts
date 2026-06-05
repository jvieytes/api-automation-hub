import { expect, test } from '@playwright/test';
import { TaskClient } from '../clients/task-client.js';
import { TestDataClient } from '../clients/test-data-client.js';
import type { ApiEnvelope, ResetResponse, Task, TaskListResponse } from '../core/types.js';
import { TaskPayloads } from '../payloads/task-payload.js';

test.describe('Tasks CRUD API - Happy paths', () => {
    test.beforeEach(async ({ request }, testInfo) => {
        const testDataClient = new TestDataClient(request, testInfo);

        const response = await testDataClient.resetData();
        const body = await response.json() as ApiEnvelope<ResetResponse>;

        expect(response.status()).toBe(200);
        expect(body.response.total).toBeGreaterThanOrEqual(2);
    });

    test('Debe listar tareas correctamente', async ({ request }, testInfo) => {
        const taskClient = new TaskClient(request, testInfo);

        const response = await taskClient.getTasks();
        const body = await response.json() as ApiEnvelope<TaskListResponse>;

        expect(response.status()).toBe(200);
        expect(body.response.total).toBeGreaterThanOrEqual(2);
        expect(Array.isArray(body.response.items)).toBeTruthy();
    });

    test('Debe crear una tarea correctamente', async ({ request }, testInfo) => {
        const taskClient = new TaskClient(request, testInfo);

        const response = await taskClient.createTask(TaskPayloads.validTodoTask());
        const body = await response.json() as ApiEnvelope<Task>;

        expect(response.status()).toBe(201);
        expect(body.response.id).toBeDefined();
        expect(body.response.title).toBe('Automatizar con Playwright');
        expect(body.response.description).toBe('Caso feliz CRUD desde TypeScript.');
        expect(body.response.status).toBe('TODO');
    });

    test('Debe consultar una tarea existente por ID', async ({ request }, testInfo) => {
        const taskClient = new TaskClient(request, testInfo);

        const createResponse = await taskClient.createTask(TaskPayloads.validTodoTask());
        const createBody = await createResponse.json() as ApiEnvelope<Task>;
        const taskId = createBody.response.id;

        const getResponse = await taskClient.getTaskById(taskId);
        const getBody = await getResponse.json() as ApiEnvelope<Task>;

        expect(getResponse.status()).toBe(200);
        expect(getBody.response.id).toBe(taskId);
        expect(getBody.response.title).toBe('Automatizar con Playwright');
        expect(getBody.response.status).toBe('TODO');
    });

    test('Debe actualizar una tarea completa correctamente', async ({ request }, testInfo) => {
        const taskClient = new TaskClient(request, testInfo);

        const createResponse = await taskClient.createTask(TaskPayloads.validTodoTask());
        const createBody = await createResponse.json() as ApiEnvelope<Task>;
        const taskId = createBody.response.id;

        const updateResponse = await taskClient.updateTask(taskId, TaskPayloads.updatedInProgressTask());
        const updateBody = await updateResponse.json() as ApiEnvelope<Task>;

        expect(updateResponse.status()).toBe(200);
        expect(updateBody.response.id).toBe(taskId);
        expect(updateBody.response.title).toBe('Automatizar con Playwright actualizado');
        expect(updateBody.response.description).toBe('Actualizado por PUT desde TypeScript.');
        expect(updateBody.response.status).toBe('IN_PROGRESS');
    });

    test('Debe actualizar solo el estado de una tarea correctamente', async ({ request }, testInfo) => {
        const taskClient = new TaskClient(request, testInfo);

        const createResponse = await taskClient.createTask(TaskPayloads.validTodoTask());
        const createBody = await createResponse.json() as ApiEnvelope<Task>;
        const taskId = createBody.response.id;

        const patchResponse = await taskClient.updateTaskStatus(taskId, 'DONE');
        const patchBody = await patchResponse.json() as ApiEnvelope<Task>;

        expect(patchResponse.status()).toBe(200);
        expect(patchBody.response.id).toBe(taskId);
        expect(patchBody.response.status).toBe('DONE');
    });

    test('Debe eliminar una tarea existente correctamente', async ({ request }, testInfo) => {
        const taskClient = new TaskClient(request, testInfo);

        const createResponse = await taskClient.createTask(TaskPayloads.validTodoTask());
        const createBody = await createResponse.json() as ApiEnvelope<Task>;
        const taskId = createBody.response.id;

        const deleteResponse = await taskClient.deleteTask(taskId);

        expect(deleteResponse.status()).toBe(200);
    });

    test('Debe ejecutar correctamente el flujo CRUD completo de tareas', async ({ request }, testInfo) => {
        const taskClient = new TaskClient(request, testInfo);

        await test.step('Crear tarea', async () => {
            const createResponse = await taskClient.createTask(TaskPayloads.validTodoTask());
            const createBody = await createResponse.json() as ApiEnvelope<Task>;

            expect(createResponse.status()).toBe(201);
            expect(createBody.response.status).toBe('TODO');

            const taskId = createBody.response.id;

            await test.step('Consultar tarea creada', async () => {
                const getResponse = await taskClient.getTaskById(taskId);
                const getBody = await getResponse.json() as ApiEnvelope<Task>;

                expect(getResponse.status()).toBe(200);
                expect(getBody.response.id).toBe(taskId);
            });

            await test.step('Actualizar tarea con PUT', async () => {
                const updateResponse = await taskClient.updateTask(taskId, TaskPayloads.updatedInProgressTask());
                const updateBody = await updateResponse.json() as ApiEnvelope<Task>;

                expect(updateResponse.status()).toBe(200);
                expect(updateBody.response.status).toBe('IN_PROGRESS');
            });

            await test.step('Actualizar estado con PATCH', async () => {
                const patchResponse = await taskClient.updateTaskStatus(taskId, 'DONE');
                const patchBody = await patchResponse.json() as ApiEnvelope<Task>;

                expect(patchResponse.status()).toBe(200);
                expect(patchBody.response.status).toBe('DONE');
            });

            await test.step('Eliminar tarea', async () => {
                const deleteResponse = await taskClient.deleteTask(taskId);

                expect(deleteResponse.status()).toBe(200);
            });
        });
    });
});