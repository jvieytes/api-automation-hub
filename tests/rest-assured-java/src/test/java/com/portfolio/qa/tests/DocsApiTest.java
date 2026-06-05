package com.portfolio.qa.tests;

import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.Matchers.containsString;

@Epic("Portfolio API")
@Feature("Swagger Documentation")
class DocsApiTest extends BaseApiTest {

    @Test
    @DisplayName("Debe cargar correctamente la documentación Swagger")
    void docsShouldLoadSuccessfully() {
        docsClient.getDocs()
            .then()
            .statusCode(200)
            .header("content-type", containsString("text/html"));
    }
}