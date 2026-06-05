package com.portfolio.qa.clients;

import com.portfolio.qa.core.BaseApiClient;
import com.portfolio.qa.core.Endpoints;
import io.restassured.response.Response;

public class DocsClient extends BaseApiClient {

    public Response getDocs() {
        return request()
            .when()
            .get(Endpoints.DOCS);
    }
}