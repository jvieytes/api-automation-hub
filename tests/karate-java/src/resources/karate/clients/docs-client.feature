Feature: Docs client

  Background:
    * url baseUrl
    * def endpoints = read('classpath:karate/core/endpoints.js')()

  @getDocs
  Scenario: Get Swagger docs
    Given path endpoints.docs
    When method get