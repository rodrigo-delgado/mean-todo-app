var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs ('mongodb://gotyou:123123123@ds153730.mlab.com:53730/meantodos',['todos'])

router.get('/todos', function(req, res, next) {
  db.todos.find(function(err, todos) {
    if(err) {
      res.send(err)
    } else {
      res.json(todos)
    }
  })
})

module.exports = router
