Feature: Test Data API

  Scenario: Debe resetear correctamente la data de prueba
    * def result = call read('classpath:karate/clients/test-data-client.feature@resetData')

    Then match result.responseStatus == 200
    And assert result.response.response.total >= 2