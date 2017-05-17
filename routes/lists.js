const
  express = require('express'),
  listRouter = express.Router(),
  List = require('../models/List.js')
//routes for the list
listRouter.route('/')
  .get((req, res) => {
    List.find({}, (err, lists) => {
      if(err) return (err)
      res.render('lists/index', {lists: lists})
    })
  })

listRouter.route('/:id')
  .get((req, res) => {
    List.findById(req.params.id, (err, list) => {
      res.render('lists/show', {list: list})
    })
  })
  .patch((req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, list) => {
      res.redirect('/lists/'+ req.params.id)
    })
  })
  .delete((req, res) => {
    List.findByIdAndRemove(req.params.id, (err, deleteList) => {
      res.redirect('/lists')
    })

  })

listRouter.get('/:id/edit', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    res.render('lists/edit',  {list: list})

  })
  })
//routes for the tasks
listRouter.route('/:id/tasks')
  .get(function(req, res){
    List.findById(req.params.id, (err, list) => {
      var task = list.task
      res.json(task)
    })
  })
  .post(function(req, res){
    //semi works need to refresh page in order for the list to update??
    List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, list) => {
      if(err) return console.log(err)
      console.log(req.body);
      var newTask = {}
      newTask.body = req.body.body
      newTask.completed = false
      list.task.push(newTask)
      list.save((err, list) => {
        res.json(list.task[list.task.length -1])
      })
      // })
    })
  })

listRouter.route('/:id/tasks/:taskId')
  .patch(function(req, res){
    //works but need to refresh to see changes
    List.findByIdAndUpdate(req.params.id, req.body,{new: true}, function(err, list){
      var newTask = list.task.id(req.params.taskId)
      var index = list.task.indexOf(newTask)
      list.task[index]= req.body
      list.save((err, list) => {
        res.json({message: 'updated list', task: list.task[index]})

      })
    })
  })
  .delete(function(req, res){
    List.findById(req.params.id, function(err, list){
      var task = list.task.id(req.params.taskId)
      var index = list.task.indexOf(task)
      list.task.splice(index, 1)
      list.save()
      // task.remove()
      res.json({message: 'Deleted'})
    })
  })


module.exports = listRouter
