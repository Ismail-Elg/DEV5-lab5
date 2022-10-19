let express = require("express");
let router = express.Router();
const Message = require("../../../models/Message");

router.get("/", function (req, res, next) {
  if (req.query.user) {
    Message.find({ user: req.query.user }, function (err, messages) {
      if (err) {
        return next(err);
      }
      if (messages.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "no messages found", 
        });
      }
      res.json(messages);
    });
  } else {
    Message.find(function (err, messages) {
      if (err) {
        return next(err);
      }
      res.json(messages);
    });
  }
});

router.get("/:id", function (req, res, next) {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID",
    });
  }
  Message.findById(req.params.id, function (err, message) {
    if (err) return console.error(err);
    res.json(message);
  });
});

router.post("/", function (req, res, next) {
  let message = new Message({
    user: req.body.user,
    text: req.body.text,
  });
  message.save((err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Error saving message, make sure you have a user and text",
      });
    } else {
      res.json({
        status: "success",
        message: "Message saved",
        data: doc,
      });
    }
  });
});

router.put("/:id", function (req, res, next) {
  //check if id is valid
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID",
    });
  }
  Message.findById(req.params.id, function (err, message) {
    if (err) return console.error(err);
    message.user = req.body.user;
    message.text = req.body.text;
    message.save((err, doc) => {
      if (err) {
        res.json({
          status: "error",
          message: "Error updating message",
        });
      } else {
        res.json({
          status: "success",
          message: "Message updated",
          data: doc,
        });
      }
    });
  });
});

router.delete("/:id", function (req, res, next) {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID",
    });
  }
  Message.findByIdAndRemove(req.params.id, function (err, message) {
    if (err) return console.error(err);
    res.json({
      status: "success",
      message: "Message deleted",
      data: message,
    });
  });
});

//check if ?user=name is in the query

module.exports = router;
