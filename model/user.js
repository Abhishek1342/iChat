const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    name: {
        type: String,
        default: "unnamed",
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    profileImage: {
        type: String,
        default: "https://img.icons8.com/material/48/000000/user--v1.png",
    },
    longitude: {
        type: String,
    },
    latitude: {
        type: String,
    },
    profileCompleted: {
        type: Boolean,
        default: false,
    },
    friend: [
        {
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});
const User = new mongoose.model("User", userSchema);
module.exports = User;
