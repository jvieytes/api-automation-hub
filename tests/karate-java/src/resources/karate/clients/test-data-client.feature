@ignore
Feature: Test data client

  Background:
    * url baseUrl
    * def endpoints = read('classpath:karate/core/endpoints.js')()

  @resetData
  Scenario: Reset test data
    Given path endpoints.testReset
    When method post