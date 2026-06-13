Feature: Swagger Documentation API

  Scenario: Debe cargar correctamente la documentación Swagger
    * def result = call read('classpath:karate/clients/docs-client.feature@getDocs')

    Then match result.responseStatus == 200
    And match result.responseHeaders['Content-Type'][0] contains 'text/html'