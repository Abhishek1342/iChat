const mongoose = require("mongoose");

const User = new mongoose.Schema({
    email: {
        type: string,
        required: true,
    },
    password: {
        type: string,
        required: true,
        min: 6,
    },
});

module.exports = User;
