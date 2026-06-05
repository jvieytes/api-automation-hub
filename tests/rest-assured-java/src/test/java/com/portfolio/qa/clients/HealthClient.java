package com.portfolio.qa.clients;

import com.portfolio.qa.endpoints.Endpoints;
import io.restassured.response.Response;

public class HealthClient extends BaseApiClient {

    public Response getHealth() {
        return request()
            .when()
            .get(Endpoints.HEALTH);
    }
}