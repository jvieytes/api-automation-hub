package com.portfolio.qa.clients;

import com.portfolio.qa.specs.RequestSpecFactory;
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