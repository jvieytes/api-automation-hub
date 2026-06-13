@ignore
Feature: Health client

  Background:
    * url baseUrl
    * def endpoints = read('classpath:karate/core/endpoints.js')()

  @getHealth
  Scenario: Get health
    Given path endpoints.health
    When method get