var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs ('mongodb://gotyou:123123123@ds153730.mlab.com:53730/meantodos',['todos'])

//Get all todos
router.get('/todos', function(req, res, next) {
  db.todos.find(function(err, todos) {
    if(err) {
      res.send(err)
    } else {
      res.json(todos)
    }
  })
})

//Get single todo
router.get('/todo/:id', function(req, res, next) {
  db.todos.findOne({
    _id:mongojs.ObjectId(req.params.id)
  },function(err, todo) {
    if(err) {
      res.send(err)
    } else {
      res.json(todo)
    }
  })
})


module.exports = router
