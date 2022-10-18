let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ 
      "status": "success",
      "message": "GETTING messages",
      "data": {
          "messages": [
              {
                  "user": "John",
                  "text": "Hello World"
              },
              {
                  "user": "Jane",
                  "text": "Hello World Again"
              }
          ]
      }
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
  if(!req.body.user || !req.body.text){
    res.json({
      "status": "error",
      "message": "POSTING message failed",
      "data": null
    });
  }
  else{
  res.json({
    "status": "success",
    "message": "POSTING message for user: " + req.body.user,
    "data": {
        "message": {
            "user": req.body.user,
            "text": req.body.text
        }
    }
  });
}

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
