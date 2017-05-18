const
  express = require('express'),
  apiRouter = express.Router(),
  apiController = require('../controllers/locations-api.js'),
  List = require('../models/List.js')


apiRouter.route('/locations')
  .get(apiController.index)
  .post(apiController.create)

apiRouter.route('/locations/:id')
  .get(apiController.show)
  .delete(apiController.destroy)

apiRouter.route('/lists')
  .get((req, res) => {
    List.find({})
    .populate('location')
    .exec((err,listsFromDb) =>{
      res.json(listsFromDb)
  })
})


module.exports = apiRouter
