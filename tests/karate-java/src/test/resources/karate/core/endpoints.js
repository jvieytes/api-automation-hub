function fn() {
  return {
    health: '/health',
    docs: '/docs/',
    testReset: '/api/v1/test/reset',
    tasks: '/api/v1/tasks',

    taskById: function (id) {
      return '/api/v1/tasks/' + id;
    },

    taskStatusById: function (id) {
      return '/api/v1/tasks/' + id + '/status';
    }
  };
}