package com.portfolio.qa.tests;

import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.Matchers.equalTo;

@Epic("Portfolio API")
@Feature("Healthcheck")
class HealthApiTest extends BaseApiTest {

    @Test
    @DisplayName("Validar que la API responda estado UP")
    void healthcheckShouldReturnUp() {
        healthClient.getHealth()
            .then()
            .statusCode(200)
            .body("response.status", equalTo("UP"));
    }
}