const
  express = require('express'),
  apiRouter = express.Router(),
  apiController = require('../controllers/locations-api.js')

apiRouter.route('/')
  .get(apiController.index)
  .post(apiController.create)

apiRouter.get('/new', apiController.new)

apiRouter.route('/:id')
  .get(apiController.show)
  .delete(apiController.destroy)


module.exports = apiRouter
