package com.portfolio.qa.core;

import io.qameta.allure.restassured.AllureRestAssured;
import io.restassured.specification.RequestSpecification;

import static io.restassured.RestAssured.given;

public abstract class BaseApiClient {

    protected RequestSpecification request() {
        return given()
            .spec(RequestSpecFactory.defaultSpec())
            .filter(new AllureRestAssured());
    }
}