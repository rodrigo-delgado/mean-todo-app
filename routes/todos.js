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

// Save todo

router.post('/todo', function(req, res, next) {
  var todo = req.body
  if(!todo.text || !(todo.isCompleted + '')) {
    res.status(400)
    res.json({
      "error": "Invalid Data"
    })

  } else {
      db.save(todo, function(err, result) {
        if(err) {
          res.send(err)
        } else {
          res.json(result)
        }
      })
    }
})

//Update Todo
router.put('/todo/:id', function(req, res, next) {
  var todo = req.body
  var updateObj = {}

  if(todo.isCompleted) {
    updateObj.isCompleted = todo.isCompleted
  }

  if(todo.text) {
    updateObj.text = todo.text
  }

  if(!updateObj) {
    res.status(400)
    res.json({
      "error": "Invalid Data"
    })
  } else {
    db.todo.update({
      _id: mongojs.ObjectId(req.params.id)
    }, updateObj, {}, function(err, result) {
        if(err) {
          res.send(err)
        } else {
          res.json(result)
        }
    })
  }
})

//Delete todo

router.delete('/todo/:id', function(req, res, next) {

  db.todo.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, '', function(err, result) {
      if(err) {
        res.send(err)
      } else {
        res.json(result)
        }
  })
})


module.exports = router
