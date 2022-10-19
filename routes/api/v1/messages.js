let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  user: String,
  text: String,
  completed: Boolean
  });

const Message = mongoose.model('Message', messageSchema);


router.get('/', function(req, res, next) {
  Message.find(function(err, messages) {
    if (err) return console.error(err);
    res.json(messages);
  });
});
 

router.get('/:id', function(req, res, next) {
  res.json({
      "status": "success",
      "message": "GETTING message with id: " + req.params.id,
      "data": {
          "message": {
              "user": "John",
              "text": "Hello World"
          }
      }
  });
});


router.post('/', function(req, res, next) {
  let message = new Message({
    user: req.body.user,
    text: req.body.text,
    completed: false
  });
  message.save((err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Error saving message",
        data: null
      });
    } else {
      res.json({
        status: "success",
        message: "Message saved",
        data: doc
      });
    }
  });
});


router.put('/:id', function(req, res, next) {
  if(!req.body.user || !req.body.text){
    res.json({
      "status": "error",
      "message": "UPDATING message failed",
    });
  }
  else{
  res.json({
    "status": "success",
    "message": "UPDATING message with id: " + req.params.id,
  });
}

});

router.delete('/:id', function(req, res, next) {
  res.json({
    "status": "success",
    "message": "DELETING message with id: " + req.params.id,
  });
});


module.exports = router;
