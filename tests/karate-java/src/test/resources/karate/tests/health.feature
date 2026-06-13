Feature: Healthcheck API

  Scenario: Debe retornar estado UP al consultar el healthcheck
    * def result = call read('classpath:karate/clients/health-client.feature@getHealth')

    Then match result.responseStatus == 200
    And match result.response.response.status == 'UP'