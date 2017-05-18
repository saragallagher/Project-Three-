const
  List = require('../models/List.js')

module.exports = {
  index: (req, res) => {
    List.find({}, (err, lists) => {
      if(err) return (err)
      res.render('lists/index', {lists: lists})
    })
  },
  show: (req, res) => {
    List.findById(req.params.id).populate('user').exec( (err, list) => {
      res.render('lists/show', {list: list})
    })
  },
  new: (req, res) => {
    res.render('lists/new',  {user:req.user})
  },
  create: (req, res) => {
    var newList = new List(req.body)
    console.log(newList);
    newList.user = req.params.id
    newList.save((err, newList) => {
        if(err){
          console.log(err)
        }else{
          res.redirect('/lists')
        }
      })
  },
  edit: (req, res) => {
    List.findById(req.params.id, (err, list) => {
      res.render('lists/edit',  {list: list})
    })
  },
  update: (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, list) => {
      res.redirect('/lists/'+ req.params.id)
    })
  },
  destroy: (req, res) => {
    List.findByIdAndRemove(req.params.id, (err, deleteList) => {
      res.redirect('/lists')
    })
  }
}
