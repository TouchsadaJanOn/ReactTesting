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

/* get question listing. */
router.get('/viewQuestion', function(req, res) {

  var db = req.app.locals.db;
  db.collection('new_question').find({}).toArray(function(err, result){
    if (err) {
      res.status(400).send("Error finding data");
    }
    else {
      res.json(result);
    }
  });
});

/* Patch question listing and votes. */
router.patch('/viewQuestion', function(req, res) {
  var id = {
    'id': req.body.id,
  }
  var votes_num = {
    'votes_num': req.body.votes_num,
  }

  var db = req.app.locals.db;
  db.collection('new_question').updateOne(id, { $set: votes_num}, function(err) {
    if (err) throw err;
  });
  res.send(
    '1 Question updated'
  );
  res.json(votes_num);
});




module.exports = router;
