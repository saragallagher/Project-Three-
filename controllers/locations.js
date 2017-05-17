const
  Location = require('../models/Location.js')

module.exports = {
  //Showing all locations
  index: (req, res) => {
    Location.find({}, (err, locationsFromDb) => {
      if(err) return (err)
      res.render('locations/index', {locations: locationsFromDb})
    })
  },
  // Show a specific location
  show: (req, res) => {
    Location.findById(req.params.id, (err, location) => {
      if(err) return console.log(err)
      res.render('locations/show', {location: location})
    })
  },

  new: (req, res) => {
    res.render('locations/new')
  },
  //Creating a new location
  create: (req, res) => {
    Location.create(req.body, (err, location) => {
      if(err) return console.log(err)
      res.redirect('/locations/' + location.id)
    })
  },
  //Deleting a specific location
  destroy: (req, res) => {
    Location.findByIdAndRemove(req.params.id, (err, deleteLocation) => {
      if(err) return console.log(err)
      res.redirect('/locations')
    })
  }
}
