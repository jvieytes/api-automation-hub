package com.portfolio.qa.clients;

import com.portfolio.qa.endpoints.Endpoints;
import com.portfolio.qa.payloads.TaskPayload;
import io.restassured.response.Response;

import java.util.Map;

public class TaskClient extends BaseApiClient {

    public Response createTask(TaskPayload payload) {
        return request()
            .body(payload.toMap())
            .when()
            .post(Endpoints.TASKS);
    }

    public Response getTasks() {
        return request()
            .when()
            .get(Endpoints.TASKS);
    }

    public Response getTaskById(Integer taskId) {
        return request()
            .pathParam("id", taskId)
            .when()
            .get(Endpoints.TASK_BY_ID);
    }

    public Response updateTask(Integer taskId, TaskPayload payload) {
        return request()
            .pathParam("id", taskId)
            .body(payload.toMap())
            .when()
            .put(Endpoints.TASK_BY_ID);
    }

    public Response updateTaskStatus(Integer taskId, String status) {
        return request()
            .pathParam("id", taskId)
            .body(Map.of("status", status))
            .when()
            .patch(Endpoints.TASK_STATUS_BY_ID);
    }

    public Response deleteTask(Integer taskId) {
        return request()
            .pathParam("id", taskId)
            .when()
            .delete(Endpoints.TASK_BY_ID);
    }
}