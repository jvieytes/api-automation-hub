package com.portfolio.qa.config;

public final class TestConfig {

    private static final String DEFAULT_BASE_URL = "http://localhost:3000";

    private TestConfig() {
    }

    public static String baseUrl() {
        return System.getProperty(
            "baseUrl",
            System.getenv().getOrDefault("BASE_URL", DEFAULT_BASE_URL)
        );
    }
}