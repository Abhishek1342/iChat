const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Conversation = new mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
