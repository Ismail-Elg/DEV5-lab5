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




module.exports = router;
