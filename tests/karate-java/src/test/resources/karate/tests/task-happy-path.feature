Feature: Tasks CRUD API - Happy paths

  Background:
    * def taskPayloads = read('classpath:karate/payloads/task-payloads.js')()

    * def reset = call read('classpath:karate/clients/test-data-client.feature@resetData')
    * match reset.responseStatus == 200
    * match reset.response.response.total >= 2

  Scenario: Debe listar tareas correctamente
    * def result = call read('classpath:karate/clients/task-client.feature@getTasks')

    Then match result.responseStatus == 200
    And match result.response.response.total >= 2
    And match result.response.response.items == '#[]'

  Scenario: Debe crear una tarea correctamente
    * def payload = taskPayloads.validTodoTask()
    * def result = call read('classpath:karate/clients/task-client.feature@createTask') { payload: '#(payload)' }

    Then match result.responseStatus == 201
    And match result.response.response.id == '#number'
    And match result.response.response.title == payload.title
    And match result.response.response.description == payload.description
    And match result.response.response.status == 'TODO'

  Scenario: Debe consultar una tarea existente por ID
    * def payload = taskPayloads.validTodoTask()
    * def created = call read('classpath:karate/clients/task-client.feature@createTask') { payload: '#(payload)' }
    * def taskId = created.response.response.id

    * def result = call read('classpath:karate/clients/task-client.feature@getTaskById') { taskId: '#(taskId)' }

    Then match result.responseStatus == 200
    And match result.response.response.id == taskId
    And match result.response.response.title == payload.title
    And match result.response.response.status == 'TODO'

  Scenario: Debe actualizar una tarea completa correctamente
    * def createPayload = taskPayloads.validTodoTask()
    * def updatePayload = taskPayloads.updatedInProgressTask()

    * def created = call read('classpath:karate/clients/task-client.feature@createTask') { payload: '#(createPayload)' }
    * def taskId = created.response.response.id

    * def result = call read('classpath:karate/clients/task-client.feature@updateTask') { taskId: '#(taskId)', payload: '#(updatePayload)' }

    Then match result.responseStatus == 200
    And match result.response.response.id == taskId
    And match result.response.response.title == updatePayload.title
    And match result.response.response.description == updatePayload.description
    And match result.response.response.status == 'IN_PROGRESS'

  Scenario: Debe actualizar solo el estado de una tarea correctamente
    * def payload = taskPayloads.validTodoTask()
    * def created = call read('classpath:karate/clients/task-client.feature@createTask') { payload: '#(payload)' }
    * def taskId = created.response.response.id

    * def result = call read('classpath:karate/clients/task-client.feature@updateTaskStatus') { taskId: '#(taskId)', status: 'DONE' }

    Then match result.responseStatus == 200
    And match result.response.response.id == taskId
    And match result.response.response.status == 'DONE'

  Scenario: Debe eliminar una tarea existente correctamente
    * def payload = taskPayloads.validTodoTask()
    * def created = call read('classpath:karate/clients/task-client.feature@createTask') { payload: '#(payload)' }
    * def taskId = created.response.response.id

    * def result = call read('classpath:karate/clients/task-client.feature@deleteTask') { taskId: '#(taskId)' }

    Then match result.responseStatus == 200

  Scenario: Debe ejecutar correctamente el flujo CRUD completo de tareas
    * def createPayload = taskPayloads.validTodoTask()
    * def updatePayload = taskPayloads.updatedInProgressTask()

    * print 'Crear tarea'
    * def created = call read('classpath:karate/clients/task-client.feature@createTask') { payload: '#(createPayload)' }
    * match created.responseStatus == 201
    * match created.response.response.status == 'TODO'
    * def taskId = created.response.response.id

    * print 'Consultar tarea creada'
    * def found = call read('classpath:karate/clients/task-client.feature@getTaskById') { taskId: '#(taskId)' }
    * match found.responseStatus == 200
    * match found.response.response.id == taskId

    * print 'Actualizar tarea mediante PUT'
    * def updated = call read('classpath:karate/clients/task-client.feature@updateTask') { taskId: '#(taskId)', payload: '#(updatePayload)' }
    * match updated.responseStatus == 200
    * match updated.response.response.status == 'IN_PROGRESS'

    * print 'Actualizar estado mediante PATCH'
    * def patched = call read('classpath:karate/clients/task-client.feature@updateTaskStatus') { taskId: '#(taskId)', status: 'DONE' }
    * match patched.responseStatus == 200
    * match patched.response.response.status == 'DONE'

    * print 'Eliminar tarea'
    * def deleted = call read('classpath:karate/clients/task-client.feature@deleteTask') { taskId: '#(taskId)' }
    * match deleted.responseStatus == 200