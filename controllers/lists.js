const List = require('../models/List.js')

module.exports = {
  index: (req, res) => {
    List.find({}, (err, listsFromDB) => {
      if(err) return (err)
      res.json(listsFromDB)
    })
  },

  create: (req, res) =>{
    List.create(req.body, (err, newList) => {
      if(err) return(err)
      res.json({success: true, list: newList})
    })
  },

  show: (req, res) => {
    List.findById(req.params.id, (err, singleList) => {
      res.json(singleList)
    })
  },

  update: (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedList) => {
      res.json({success: true, list: updatedList})
    })
  },

  destroy: (req, res) => {
    List.findByIdAndRemove(req.params.id, (err, deleteList) => {
      res.redirect('/lists')
    })
  }

}
