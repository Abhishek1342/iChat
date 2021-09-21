const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult, check } = require("express-validator");
require("../DB/DBConnection");
const User = require("../model/user");
const router = express.Router();

router.post(
    "/login",
    [
        body("usernameEmail").notEmpty().withMessage("Fill all fields"),
        body("password").notEmpty().withMessage("fill all fields"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ err: errors.array() });
        }
        const { usernameEmail, password } = req.body;
        if (!usernameEmail || !password) {
            return res.status(400).json({ err: "fill all fields" });
        }
        try {
            const userEmail = await User.findOne({ email: usernameEmail });
            if (!userEmail) {
                const userName = await User.findOne({
                    username: usernameEmail,
                });
                if (!userName) {
                    return res.status(400).json({ err: "Account not found" });
                } else {
                    const matchUserNamePass = await bcrypt.compare(
                        password,
                        userName.password
                    );
                    if (!matchUserNamePass) {
                        return res
                            .status(400)
                            .json({ err: "Invalid credentials" });
                    }
                    return res.status(200).json({ msg: "Login successfull" });
                }
            } else {
                const matchemailPass = await bcrypt.compare(
                    password,
                    userEmail.password
                );
                if (!matchemailPass) {
                    return res.status(400).json({ err: "Invalid credentials" });
                }
                return res.status(200).json({ msg: "Login successfull" });
            }
        } catch (err) {
            return res.status(500).json({ err: "server error" });
            console.log(err);
        }
    }
);
router.post(
    "/signup",
    [
        body("username").notEmpty().isString(),
        body("email")
            .notEmpty()
            .isEmail()
            .withMessage("Enter a valid E-mail address"),
        body("password")
            .notEmpty()
            .isLength({ min: 6 })
            .withMessage("Minimum 6 character"),
        body("cpassword")
            .notEmpty()
            .isLength({ min: 6 })
            .withMessage("Minimum 6 character"),
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
                const addUser = await newUser.save();
                if (addUser) {
                    return res
                        .status(200)
                        .json({ err: "successfully registered" });
                }
            } catch (err) {
                return res.status(500).json({ err: "Server error" });
                console.log(err);
            }
        }
    }
);

module.exports = router;
