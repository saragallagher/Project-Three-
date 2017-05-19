const
  express = require('express'),
  locationRouter = express.Router(),
  locationsController = require('../controllers/locations.js')

locationRouter.route('/')
  .get(locationsController.index)
  .post(locationsController.create)

locationRouter.get('/new', locationsController.new)

locationRouter.route('/:id', isLoggedIn)
  .get(locationsController.show)
  .delete(locationsController.destroy)

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = locationRouter
