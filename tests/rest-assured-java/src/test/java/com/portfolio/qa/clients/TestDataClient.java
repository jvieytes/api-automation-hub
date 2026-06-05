package com.portfolio.qa.clients;

import com.portfolio.qa.endpoints.Endpoints;
import io.restassured.response.Response;

public class TestDataClient extends BaseApiClient {

    public Response resetData() {
        return request()
            .when()
            .post(Endpoints.TEST_RESET);
    }
}