package com.portfolio.qa.tests;

import com.portfolio.qa.clients.HealthClient;
import com.portfolio.qa.clients.TaskClient;
import com.portfolio.qa.clients.TestDataClient;

public abstract class BaseApiTest {

    protected final HealthClient healthClient = new HealthClient();
    protected final TaskClient taskClient = new TaskClient();
    protected final TestDataClient testDataClient = new TestDataClient();
}