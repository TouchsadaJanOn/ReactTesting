var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/responses', function(req, res) {

  var db = req.app.locals.db;
  db.collection('responses').find({}).toArray(function(err, result) {
    if (err) {
      res.status(400).send("Error getting responses!!!");
    } else {
      res.json(result);
    }
  });

});

router.post('/responses', function (req, res) {

  var response = {
    'id': req.body.id, 
    'qID': req.body.qID, 
    'comment': req.body.comment
  }

  var db = req.app.locals.db;
  db.collection('responses').insertOne(response);

  res.send(
    'Question and response Inserted'
  );
});

/* Patch users listing. */
router.patch('/responses', function(req, res) {
  const new_comment = {
    'comment': req.body.comment
  }

  var db = req.app.locals.db;
  db.collection('responses').find(new_comment).toArray(function(err, result){
    if (err) {
      res.status(400).send("Error finding user");
    }
    else {
      res.json(result);
    }
  });
});

module.exports = router;