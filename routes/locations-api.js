const
  express = require('express'),
  apiRouter = express.Router(),
  apiController = require('../controllers/locations-api.js')

apiRouter.route('/locations')
  .get(apiController.index)
  .post(apiController.create)

apiRouter.route('/locations/:id')
  .get(apiController.show)
  .delete(apiController.destroy)


module.exports = apiRouter
