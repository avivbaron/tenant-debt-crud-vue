const taskBuilder = require('../controllers/taskController');
const userBuilder = require('../controllers/userController');
const authRoute = require('../../auth.js');

// tenants routes
module.exports = app => {
  app
    .route('/tasks')
    .get(authRoute, taskBuilder.list_all_tasks)
    .post(taskBuilder.create_a_task);

  app
    .route('/search/:search_query')
    .get(authRoute, taskBuilder.search_task_by_name);

  app
    .route('/tasks/:taskId')
    .get(taskBuilder.read_a_task)
    .put(taskBuilder.update_a_task)
    .delete(taskBuilder.delete_a_task);

  app
    .route('/users/register')
    .post(userBuilder.registerNewUser);

  app
    .route('/users/login')
    .post(userBuilder.loginUser);
};
