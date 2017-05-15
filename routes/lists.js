const
  express = require('express'),
  listRouter = express.Router(),
  listsCtrl = require('../controllers/lists.js')

listRouter.route('/')
  .get(listsCtrl.index)
  .post(listsCtrl.create)

listRouter.route('/:id')
  .get(listsCtrl.show)
  .patch(listsCtrl.update)
  .delete(listsCtrl.destroy)

module.exports = listRouter
