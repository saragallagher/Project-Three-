const
  mongoose = require('mongoose'),
  listSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    location: String,
    task: String,
    weather: String,
    type: String
  }, {timestamps: true})

  module.exports = mongoose.model('List', listSchema)
