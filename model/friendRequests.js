const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
    from: {
        type: String,
        require: true,
    },
    to: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const FriendRequest = new mongoose.model("FriendRequest", friendRequestSchema);

module.exports = FriendRequest;
