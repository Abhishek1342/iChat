const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    receiver: {
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
    status: {
        type: String,
        default: "sent",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Message = new mongoose.model("Message", messageSchema);
module.exports = Message;
