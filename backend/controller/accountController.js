const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("../DB/DBConnection");
const User = require("../model/user");
// login function
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/login
//NO AUTHENTICATION REQUIRED

exports.loginUser = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, err: errors.array() });
    }
    const { usernameEmail, password } = req.body;

    try {
        let user = await User.findOne({ email: usernameEmail });
        if (!user) {
            user = await User.findOne({
                username: usernameEmail,
            });
        }
        if (!user) {
            return res.status(400).json({ success, err: "Account not found" });
        } else {
            const matchPass = await bcrypt.compare(password, user.password);
            if (!matchPass) {
                return res
                    .status(400)
                    .json({ success, err: "Invalid credentials" });
            }
            success = true;
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(payload, process.env.AUTH_TOKEN);
            return res
                .status(200)
                .json({ success, authToken, msg: "Login successfull" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "server error" });
    }
};

// FOR USER TO SIGNUP ACCOUNT
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/signup
// NO AUTHENTICATION REQUIRED

exports.signupUser = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, err: errors.array() });
    } else {
        const { username, email, password, cpassword } = req.body;

        try {
            if (!username.match("^[A-Za-z][A-Za-z0-9_]{3,29}$")) {
                return res
                    .status(400)
                    .json({ success, err: "username is invalid" });
            }
            const existingUsername = await User.findOne({
                username: username,
            });
            const existingEmail = await User.findOne({
                email: email,
            });
            if (existingUsername) {
                return res
                    .status(400)
                    .json({ success, err: "username already exists" });
            }
            if (existingEmail) {
                return res
                    .status(400)
                    .json({ success, err: "Email already exists" });
            }
            if (password != cpassword) {
                return res.status(400).json({
                    err: "password and confirm password do not match",
                });
            }
            const newUser = new User({ username, email, password });
            const user = await newUser.save();
            success = true;
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const authToken = await jwt.sign(payload, process.env.AUTH_TOKEN);
            res.status(200).json({
                success,
                authToken,
                msg: "signup successfull",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err: "Server error" });
        }
    }
};
// FOR USER TO ENTER THERE PROFILE DETAILS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/setprofile
// AUTHENTICATION REQUIRED

exports.setProfile = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, err: errors.array() });
    }
    const { name, age, gender } = req.body;
    console.log(name, age, gender);
    res.json({ msg: { name, age, gender } });
};
