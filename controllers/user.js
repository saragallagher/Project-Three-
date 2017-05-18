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
    User.findByIdAndRemove(req.params.id, (err, deleteList) => {
      res.redirect('/')
    })
  },
  adminUpdate: (req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.local.isAdmin = true;
        //Save the updated document back to the database
        user.save(function (err, user){
          if (err) {
                res.status(500).send(err)
            }
            res.redirect('/profile')
          })
      })
    }
}
