const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Chat = require("../../models/Chat");

// importing validation
const validateChatInput = require("../../validation/chat");


// #route GET api/chat/test                    #Public
// #desc tests chat route

router.get("/test", (req, res) => {
    res.json({
        msg: "chat works"
    });
});


// #route POST api/chat/send                    #Private
// #desc sends chat msg

router.post("/send", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateChatInput(req.body);

    // checking validation
    if (!isValid) {
        // if any errors send 400 with errors object
        return res.status(400).json(errors);
    }

    const newChat = new Chat({
        sender_id: req.user.id,
        receiver_id: req.body.receiver_id,
        sender_name: req.user.name,
        receiver_name: req.body.receiver_name,
        text: req.body.text
    });

    newChat.save().then((chat) => {
        res.json(chat);
    });

});

// #route GET api/chat                    #Private
// #desc get all msgs

router.get("/", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    Chat.find()
        .sort({
            date: 1
        })
        .then((chat) => {
            res.json(chat);
        })
        .catch((err) => {
            res.status(404).json({
                nopostsfound: "no chat found"
            });
        });
});



// #route GET api/chat/:receiver_id                    #Private
// #desc GET all messages of one receiver_id

router.get("/:receiver_id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    Chat.find({receiver_id: req.params.receiver_id})
        .then((chat) => {
            res.json(chat);
        })
        .catch((err) => {
            res.status(404).json({
                nopostsfound: "no chat found"
            });
        });
});


module.exports = router;