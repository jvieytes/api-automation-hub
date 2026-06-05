package com.portfolio.qa.tests;

import com.portfolio.qa.payloads.TaskPayload;

import io.qameta.allure.Epic;
import io.qameta.allure.Feature;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.notNullValue;

@Epic("Portfolio API")
@Feature("Tasks CRUD")
class TaskApiTest extends BaseApiTest {

    @BeforeEach
    void resetData() {
        testDataClient.resetData()
            .then()
            .statusCode(200)
            .body("response.total", equalTo(2));
    }

    @Test
    void shouldCreateListUpdateAndDeleteTask() {
        Integer taskId = taskClient.createTask(TaskPayload.validTodoTask())
            .then()
            .statusCode(201)
            .body("response.id", notNullValue())
            .body("response.title", equalTo("Automatizar con Rest Assured"))
            .extract()
            .path("response.id");

        taskClient.getTasks()
            .then()
            .statusCode(200)
            .body("response.total", greaterThanOrEqualTo(3));

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

        taskClient.getTaskById(taskId)
            .then()
            .statusCode(404)
            .body("code", equalTo("TASK_NOT_FOUND"));
    }

    @Test
    void shouldRejectInvalidStatus() {
        taskClient.createTask(TaskPayload.invalidStatusTask())
            .then()
            .statusCode(400)
            .body("code", equalTo("VALIDATION_ERROR"))
            .body("details[0].field", equalTo("status"));
    }
}