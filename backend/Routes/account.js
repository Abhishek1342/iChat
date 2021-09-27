const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
require("../DB/DBConnection");
const User = require("../model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authUser = require("../middleware/auth");

// ROUTE 1 : FOR USER TO LOGIN
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/login
//NO AUTHENTICATION REQUIRED

router.post(
    "/login",
    [
        body("usernameEmail", "Fill all fields").exists(),
        body("password", "Fill all fields").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ err: errors.array() });
        }
        const { usernameEmail, password } = req.body;

        try {
            let user = await User.findOne({ email: usernameEmail });
            if (!user) {
                user = await User.findOne({
                    username: usernameEmail,
                });
                if (!user) {
                    return res.status(400).json({ err: "Account not found" });
                } else {
                    const matchUserNamePass = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (!matchUserNamePass) {
                        return res
                            .status(400)
                            .json({ err: "Invalid credentials" });
                    }
                    const payload = {
                        user: {
                            id: user.id,
                        },
                    };
                    const authToken = jwt.sign(payload, process.env.AUTH_TOKEN);
                    return res
                        .status(200)
                        .json({ msg: "Login successfull", authToken });
                }
            } else {
                const matchemailPass = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!matchemailPass) {
                    return res.status(400).json({ err: "Invalid credentials" });
                }
                const payload = {
                    user: {
                        id: user.id,
                    },
                };
                const authToken = jwt.sign(payload, process.env.AUTH_TOKEN);
                return res
                    .status(200)
                    .res.header("auth-token", token)
                    .json({ msg: "Login successfull" });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err: "server error" });
        }
    }
);

// ROUTE 1 : FOR USER TO SIGNUP ACCOUNT
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/signup
//NO AUTHENTICATION REQUIRED

router.post(
    "/signup",
    [
        body("username", "invalid username").exists().isString(),
        body("email", "Enter a valid E-mail address").exists().isEmail(),
        body("password", "Minimum 6 character").exists().isLength({ min: 6 }),
        body("cpassword", "Minimum 6 character").exists().isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ err: errors.array() });
        } else {
            const { username, email, password, cpassword } = req.body;

            try {
                const existingUsername = await User.findOne({
                    username: username,
                });
                const existingEmail = await User.findOne({
                    email: email,
                });
                if (existingUsername) {
                    return res
                        .status(400)
                        .json({ err: "username already exists" });
                }
                if (existingEmail) {
                    return res
                        .status(400)
                        .json({ err: "Email already exists" });
                }
                if (password != cpassword) {
                    return res.status(400).json({
                        err: "password and confirm password do not match",
                    });
                }
                const newUser = new User({ username, email, password });
                const user = await newUser.save();
                const payload = {
                    user: {
                        id: user.id,
                    },
                };
                const authToken = await jwt.sign(
                    payload,
                    process.env.AUTH_TOKEN
                );
                res.status(200).header("auth-token", token).json({
                    msg: "signup successfull",
                });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ err: "Server error" });
            }
        }
    }
);

router.post("/new", authUser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        if (!user) {
            return res.status(401).json({ err: "Unauthorized" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Server error" });
    }
});

module.exports = router;
