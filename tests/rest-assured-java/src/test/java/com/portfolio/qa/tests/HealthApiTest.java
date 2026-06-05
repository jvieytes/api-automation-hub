package com.portfolio.qa.tests;

import org.junit.jupiter.api.Test;

import static org.hamcrest.Matchers.equalTo;

class HealthApiTest extends BaseApiTest {

    @Test
    void healthcheckShouldReturnUp() {
        healthClient.getHealth()
            .then()
            .statusCode(200)
            .body("response.status", equalTo("UP"));
    }
}