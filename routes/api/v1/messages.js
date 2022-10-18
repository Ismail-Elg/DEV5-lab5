let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ 
      "status": "success",
      "data": {
          "messages": [
              {
                  "id": 1,
                  "text": "Hello World"
              },
              {
                  "id": 2,
                  "text": "Hello World Again"
              }
          ]
      }
   });
});


module.exports = router;
