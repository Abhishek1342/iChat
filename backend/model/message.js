const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Message = new mongoose.model("Message", messageSchema);
module.exports = message;
