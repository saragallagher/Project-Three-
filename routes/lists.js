const
  express = require('express'),
  listRouter = express.Router(),
  List = require('../models/List.js')

listRouter.route('/')
  .get((req, res) => {
    List.find({}, (err, lists) => {
      if(err) return (err)
      res.render('lists/index', {lists: lists})
    })
  })
  .post((req, res) =>{
    List.create(req.body, (err, newList) => {
      if(err) return(err)
      res.redirect('/lists')
    })
  })

listRouter.get('/new', (req, res) => {
  res.render('lists/new')
})

listRouter.route('/:id')
  .get((req, res) => {
    List.findById(req.params.id, (err, list) => {
      res.render('lists/show', {list: list})
    })
  })
  .patch((req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedList) => {
      res.json({success: true, list: updatedList})
    })
  })
  .delete((req, res) => {
    List.findByIdAndRemove(req.params.id, (err, deleteList) => {
      res.redirect('/lists')
    })
  })



listRouter.route('/:id/tasks')
  .get(function(req, res){
    List.findById(req.params.id, (err, list) => {
      var task = list.task
      res.json(task)
    })
  })
  .post(function(req, res){
    List.findById(req.params.id, (err, list) => {
      if(err) return console.log(err)
      list.task.push(req.body)
      list.save((err)=> {
        res.json(list)
      })
    })
  })

module.exports = listRouter
