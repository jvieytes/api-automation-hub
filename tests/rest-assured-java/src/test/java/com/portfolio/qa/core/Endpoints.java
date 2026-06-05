package com.portfolio.qa.core;

public final class Endpoints {

    private Endpoints() {
    }

    public static final String HEALTH = "/health";
    public static final String DOCS = "/docs/";

    public static final String TEST_RESET = "/api/v1/test/reset";

    public static final String TASKS = "/api/v1/tasks";
    public static final String TASK_BY_ID = "/api/v1/tasks/{id}";
    public static final String TASK_STATUS_BY_ID = "/api/v1/tasks/{id}/status";
}