// All data is in JSON
const
  Location = require('../models/Location.js'),
  List = require('../models/List.js')

module.exports = {
  //Showing all locations
  index: (req, res) => {
    Location.find({}, (err, locationsFromDb) => {
      if(err) return (err)
      res.json(locationsFromDb)
    })
  },
  // Show a specific location
  show: (req, res) => {
    Location.findById(req.params.id, (err, location) => {
      if(err) return console.log(err)
      res.json(location)
    })
  },
  //Creating a new location
  create: (req, res) => {
    Location.create(req.body, (err, location) => {
      if(err) return console.log(err)
      res.json({success: true, message: "Location created", location:location})
    })
  },
  //Deleting a specific location
  destroy: (req, res) => {
    Location.findByIdAndRemove(req.params.id, (err, deleteLocation) => {
      if(err) return console.log(err)
      res.json({success: true, message: "Location deleted"})
    })
  }
}
