var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Post users listing. */
router.post('/register', function(req, res) {
  const newUser = {
    name : req.body.name,
    email : req.body.email,
    password: req.body.password,
  
  }
  var db = req.app.locals.db;
  db.collection('new_users').insertOne(newUser);

  res.send(newUser);
});

/* Patch users listing. */
router.patch('/login', function(req, res) {
  const user_email = {
    'email' : req.body.email,
  }

  var db = req.app.locals.db;
  db.collection('new_users').find(user_email).toArray(function(err, result){
    if (err) {
      res.status(400).send("Error finding user");
    }
    else {
      res.json(result);
    }
  });
});

//post questions
router.post('/createQuestion', function(req, res) {
  const newQuestion = {
    asker : req.body.asker,
    question : req.body.question
  }
  var db = req.app.locals.db;
  db.collection('new_question').insertOne(newQuestion);

  res.send(newQuestion);
});


module.exports = router;
