import * as allure from 'allure-js-commons';

import { TaskClient } from '../clients/task-client';
import { TestDataClient } from '../clients/test-data-client';
import { TaskPayloads } from '../payloads/task-payload';

describe('Tasks CRUD API - Happy paths', () => {
    const taskClient = new TaskClient();
    const testDataClient = new TestDataClient();

    beforeEach(() => {
        allure.epic('Portfolio API');
        allure.feature('Tasks CRUD');

        return testDataClient.resetData().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.response.total)
                .to.be.greaterThan(1);
        });
    });

    it('Debe listar tareas correctamente', () => {
        taskClient.getTasks().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.response.total)
                .to.be.greaterThan(1);

            expect(response.body.response.items)
                .to.be.an('array');
        });
    });

    it('Debe crear una tarea correctamente', () => {
        const payload = TaskPayloads.validTodoTask();

        taskClient.createTask(payload).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.response.id).to.exist;
            expect(response.body.response.title)
                .to.eq(payload.title);
            expect(response.body.response.description)
                .to.eq(payload.description);
            expect(response.body.response.status)
                .to.eq('TODO');
        });
    });

    it('Debe consultar una tarea existente por ID', () => {
        const payload = TaskPayloads.validTodoTask();

        taskClient
            .createTask(payload)
            .then((createResponse) => {
                expect(createResponse.status).to.eq(201);

                return taskClient.getTaskById(
                    createResponse.body.response.id
                );
            })
            .then((getResponse) => {
                expect(getResponse.status).to.eq(200);
                expect(getResponse.body.response.title)
                    .to.eq(payload.title);
                expect(getResponse.body.response.status)
                    .to.eq('TODO');
            });
    });

    it('Debe actualizar una tarea completa correctamente', () => {
        const createPayload = TaskPayloads.validTodoTask();
        const updatePayload =
            TaskPayloads.updatedInProgressTask();

        taskClient
            .createTask(createPayload)
            .then((createResponse) => {
                return taskClient.updateTask(
                    createResponse.body.response.id,
                    updatePayload
                );
            })
            .then((updateResponse) => {
                expect(updateResponse.status).to.eq(200);
                expect(updateResponse.body.response.title)
                    .to.eq(updatePayload.title);
                expect(updateResponse.body.response.description)
                    .to.eq(updatePayload.description);
                expect(updateResponse.body.response.status)
                    .to.eq('IN_PROGRESS');
            });
    });

    it('Debe actualizar solo el estado de una tarea correctamente', () => {
        taskClient
            .createTask(TaskPayloads.validTodoTask())
            .then((createResponse) => {
                return taskClient.updateTaskStatus(
                    createResponse.body.response.id,
                    'DONE'
                );
            })
            .then((patchResponse) => {
                expect(patchResponse.status).to.eq(200);
                expect(patchResponse.body.response.status)
                    .to.eq('DONE');
            });
    });

    it('Debe eliminar una tarea existente correctamente', () => {
        taskClient
            .createTask(TaskPayloads.validTodoTask())
            .then((createResponse) => {
                return taskClient.deleteTask(
                    createResponse.body.response.id
                );
            })
            .then((deleteResponse) => {
                expect(deleteResponse.status).to.eq(200);
            });
    });

    it('Debe ejecutar correctamente el flujo CRUD completo de tareas', () => {
        let taskId: number;

        cy.then(() => {
            allure.step('Crear tarea', () => {
                cy.log('Crear tarea');
            });

            return taskClient.createTask(
                TaskPayloads.validTodoTask()
            );
        })
            .then((createResponse) => {
                expect(createResponse.status).to.eq(201);
                expect(createResponse.body.response.status)
                    .to.eq('TODO');

                taskId = createResponse.body.response.id;

                allure.step('Consultar tarea creada', () => {
                    cy.log('Consultar tarea creada');
                });

                return taskClient.getTaskById(taskId);
            })
            .then((getResponse) => {
                expect(getResponse.status).to.eq(200);
                expect(getResponse.body.response.id)
                    .to.eq(taskId);

                allure.step('Actualizar tarea mediante PUT', () => {
                    cy.log('Actualizar tarea mediante PUT');
                });

                return taskClient.updateTask(
                    taskId,
                    TaskPayloads.updatedInProgressTask()
                );
            })
            .then((updateResponse) => {
                expect(updateResponse.status).to.eq(200);
                expect(updateResponse.body.response.status)
                    .to.eq('IN_PROGRESS');

                allure.step('Actualizar estado mediante PATCH', () => {
                    cy.log('Actualizar estado meduante PATCH');
                });

                return taskClient.updateTaskStatus(
                    taskId,
                    'DONE'
                );
            })
            .then((patchResponse) => {
                expect(patchResponse.status).to.eq(200);
                expect(patchResponse.body.response.status)
                    .to.eq('DONE');

                allure.step('Eliminar tarea', () => {
                    cy.log('Eliminar tarea');
                });

                return taskClient.deleteTask(taskId);
            })
            .then((deleteResponse) => {
                expect(deleteResponse.status).to.eq(200);
            });
    });
});