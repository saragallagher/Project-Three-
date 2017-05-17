const
  express = require('express'),
  listRouter = express.Router(),
  List = require('../models/List.js'),
  tasksController = require('../controllers/task.js')
  listsController = require('../controllers/list.js')
//routes for the list
listRouter.route('/')
  .get(listsController.index)

listRouter.route('/:id')
  .get(listsController.show)
  .patch(listsController.update)
  .delete(listsController.destroy)

listRouter.route('/:id/edit')
  .get(listsController.edit)
//routes for the tasks
listRouter.route('/:id/tasks')
  .get(tasksController.index)
  .post(tasksController.create)

listRouter.route('/:id/tasks/:taskId')
  .patch(tasksController.update)
  .delete(tasksController.destroy)


module.exports = listRouter
