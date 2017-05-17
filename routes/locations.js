const
  express = require('express'),
  locationRouter = express.Router(),
  locationsController = require('../controllers/locations.js')

locationRouter.route('/')
  .get(locationsController.index)
  .post(locationsController.create)

locationRouter.get('/new', locationsController.new)

locationRouter.route('/:id')
  .get(locationsController.show)
  .delete(locationsController.destroy)


module.exports = locationRouter
