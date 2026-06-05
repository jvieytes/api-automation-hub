package com.portfolio.qa.tests;

import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

//import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;

@Epic("Portfolio API")
@Feature("Test Data")
class TestDataApiTest extends BaseApiTest {

    @Test
    @DisplayName("Debe resetear correctamente la data de prueba")
    void shouldResetTestDataSuccessfully() {
        testDataClient.resetData()
            .then()
            .statusCode(200)
            .body("response.total", greaterThanOrEqualTo(2));
    }
}