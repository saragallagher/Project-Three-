const
  User = require('../models/User.js')

module.exports = {
  index: (req, res) => {

  },
  show: (req, res) => {

  },
  edit: (req, res) => {

  },
  update: (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, list) => {
      res.redirect('/lists/'+ req.params.id)
    })
  },
  destroy: (req, res) => {
    List.findByIdAndRemove(req.params.id, (err, deleteList) => {
      res.redirect('/')
    })
  }
}
