const
  mongoose = require('mongoose'),
  taskSchema = mongoose.Schema({
    body: String,
    completed: Boolean
  }),
  listSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: String,
    location: String,
    task: [taskSchema],
    weather: String,
    type: String
  }, {timestamps: true})

  module.exports = mongoose.model('List', listSchema)
