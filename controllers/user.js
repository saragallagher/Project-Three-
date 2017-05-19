const
  User = require('../models/User.js')

module.exports = {
  index: (req, res) => {

  },
  users: (req,res) => {
    User.find({}, (err, users) => {
      if(err) return (err)
      res.json(users)
    })
  },
  show: (req, res) => {

  },
  edit: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      res.render('users/edit',  {user: user})
    })
  },
  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, user) => {
      if(err) {return (err)}
      // res.render('users/profile', {user: req.user})
      res.redirect('/profile')
    })
  },
  destroy: (req, res) => {
      User.findByIdAndRemove(req.params.id, (err, deleteUser) => {
        if(err) return console.log(err)
        res.redirect('/')
      })
    },

  adminUpdate: (req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.isAdmin = true;
        //Save the updated document back to the database
        user.save(function (err, user){
          if (err) {
                res.status(500).send(err)
            }
            res.redirect('/profile/'+user.id)
          })
      })
    }
}
