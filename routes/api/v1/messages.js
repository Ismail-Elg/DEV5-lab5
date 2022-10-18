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




module.exports = router;
