package com.portfolio.qa.tests;

import com.portfolio.qa.payloads.TaskPayload;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.notNullValue;

@Epic("Portfolio API")
@Feature("Tasks CRUD")
class TaskHappyPathApiTest extends BaseApiTest {

    @BeforeEach
    void resetData() {
        testDataClient.resetData()
            .then()
            .statusCode(200)
            .body("response.total", greaterThanOrEqualTo(2));
    }

    @Test
    @DisplayName("Debe listar tareas correctamente")
    void shouldListTasksSuccessfully() {
        taskClient.getTasks()
            .then()
            .statusCode(200)
            .body("response.total", greaterThanOrEqualTo(2))
            .body("response.items", notNullValue());
    }

    @Test
    @DisplayName("Debe crear una tarea correctamente")
    void shouldCreateTaskSuccessfully() {
        taskClient.createTask(TaskPayload.validTodoTask())
            .then()
            .statusCode(201)
            .body("response.id", notNullValue())
            .body("response.title", equalTo("Automatizar con Rest Assured"))
            .body("response.description", equalTo("Caso feliz CRUD desde Java."))
            .body("response.status", equalTo("TODO"));
    }

    @Test
    @DisplayName("Debe consultar una tarea existente por ID")
    void shouldGetTaskByIdSuccessfully() {
        Integer taskId = taskClient.createTask(TaskPayload.validTodoTask())
            .then()
            .statusCode(201)
            .extract()
            .path("response.id");

        taskClient.getTaskById(taskId)
            .then()
            .statusCode(200)
            .body("response.id", equalTo(taskId))
            .body("response.title", equalTo("Automatizar con Rest Assured"))
            .body("response.status", equalTo("TODO"));
    }

    @Test
    @DisplayName("Debe actualizar una tarea completa correctamente")
    void shouldUpdateTaskSuccessfully() {
        Integer taskId = taskClient.createTask(TaskPayload.validTodoTask())
            .then()
            .statusCode(201)
            .extract()
            .path("response.id");

        taskClient.updateTask(taskId, TaskPayload.updatedInProgressTask())
            .then()
            .statusCode(200)
            .body("response.id", equalTo(taskId))
            .body("response.title", equalTo("Automatizar con Java actualizado"))
            .body("response.description", equalTo("Actualizado por PUT."))
            .body("response.status", equalTo("IN_PROGRESS"));
    }

    @Test
    @DisplayName("Debe actualizar solo el estado de una tarea correctamente")
    void shouldUpdateTaskStatusSuccessfully() {
        Integer taskId = taskClient.createTask(TaskPayload.validTodoTask())
            .then()
            .statusCode(201)
            .extract()
            .path("response.id");

        taskClient.updateTaskStatus(taskId, "DONE")
            .then()
            .statusCode(200)
            .body("response.id", equalTo(taskId))
            .body("response.status", equalTo("DONE"));
    }

    @Test
    @DisplayName("Debe eliminar una tarea existente correctamente")
    void shouldDeleteTaskSuccessfully() {
        Integer taskId = taskClient.createTask(TaskPayload.validTodoTask())
            .then()
            .statusCode(201)
            .extract()
            .path("response.id");

        taskClient.deleteTask(taskId)
            .then()
            .statusCode(200);
    }

    @Test
    @DisplayName("Debe ejecutar correctamente el flujo CRUD completo de tareas")
    void shouldExecuteFullCrudFlowSuccessfully() {
        Integer taskId = taskClient.createTask(TaskPayload.validTodoTask())
            .then()
            .statusCode(201)
            .body("response.id", notNullValue())
            .body("response.status", equalTo("TODO"))
            .extract()
            .path("response.id");

        taskClient.getTaskById(taskId)
            .then()
            .statusCode(200)
            .body("response.id", equalTo(taskId));

        taskClient.updateTask(taskId, TaskPayload.updatedInProgressTask())
            .then()
            .statusCode(200)
            .body("response.status", equalTo("IN_PROGRESS"));

        taskClient.updateTaskStatus(taskId, "DONE")
            .then()
            .statusCode(200)
            .body("response.status", equalTo("DONE"));

        taskClient.deleteTask(taskId)
            .then()
            .statusCode(200);
    }
}