package com.portfolio.qa.payloads;

import java.util.Map;

public record TaskPayload(
    String title,
    String description,
    String status
) {

    public Map<String, Object> toMap() {
        return Map.of(
            "title", title,
            "description", description,
            "status", status
        );
    }

    public static TaskPayload validTodoTask() {
        return new TaskPayload(
            "Automatizar con Rest Assured",
            "Caso feliz CRUD desde Java.",
            "TODO"
        );
    }

    public static TaskPayload updatedInProgressTask() {
        return new TaskPayload(
            "Automatizar con Java actualizado",
            "Actualizado por PUT.",
            "IN_PROGRESS"
        );
    }

    public static TaskPayload invalidStatusTask() {
        return new TaskPayload(
            "Estado invalido",
            "Validar regla de negocio.",
            "BLOCKED"
        );
    }
}