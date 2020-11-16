const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating schema for chat

const ChatSchema = new Schema({
    sender_id : {
        type: Schema.Types.ObjectId,
        ref : "users"
    },
    receiver_id : {
        type: Schema.Types.ObjectId,
        ref : "users"
    },
    sender_name:{
        type: Schema.Types.String
    },
    receiver_name:{
        type: String
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = Chat = mongoose.model("chat", ChatSchema);