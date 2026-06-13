function fn() {
  return {
    validTodoTask: function () {
      return {
        title: 'Automatizar con Karate',
        description: 'Caso feliz CRUD desde Karate.',
        status: 'TODO'
      };
    },

    updatedInProgressTask: function () {
      return {
        title: 'Automatizar con Karate actualizado',
        description: 'Actualizado mediante PUT desde Karate.',
        status: 'IN_PROGRESS'
      };
    }
  };
}