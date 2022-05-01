var express = require('express');
var router = express.Router();

/* GET comment listing. */
router.get('/question_comment', function(req, res) {

  var db = req.app.locals.db;
  db.collection('comment').find({}).toArray(function(err, result) {
    if (err) {
      res.status(400).send("Error getting comment!!!");
    } else {
      res.json(result);
    }
  });

});

router.post('/question_comment', function (req, res) {

  var question_comment = {
      id: req.body.id, 
      qID: req.body.qID, 
      comment: req.body.comment
    }

  var db = req.app.locals.db;
  db.collection('comments').insertOne(question_comment);

  res.send(
    'Comment inserted into database'
  );
});

module.exports = router;