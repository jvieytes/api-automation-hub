Feature: Task client

  Background:
    * url baseUrl
    * def endpoints = read('classpath:karate/core/endpoints.js')()

  @getTasks
  Scenario: Get tasks
    Given path endpoints.tasks
    When method get

  @createTask
  Scenario: Create task
    Given path endpoints.tasks
    And request payload
    When method post

  @getTaskById
  Scenario: Get task by id
    Given path endpoints.taskById(taskId)
    When method get

  @updateTask
  Scenario: Update task
    Given path endpoints.taskById(taskId)
    And request payload
    When method put

  @updateTaskStatus
  Scenario: Update task status
    Given path endpoints.taskStatusById(taskId)
    And request { status: '#(status)' }
    When method patch

  @deleteTask
  Scenario: Delete task
    Given path endpoints.taskById(taskId)
    When method delete