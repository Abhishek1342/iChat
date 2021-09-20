const express = require("express");
const { body, validationResult, check } = require("express-validator");
require("../DB/DBConnection");
const User = require("../model/user");
const router = express.Router();

router.post("/login", (req, res, next) => {});
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
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
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
                        .json({ msg: "username already exists" });
                }
                if (existingEmail) {
                    return res
                        .status(400)
                        .json({ msg: "Email already exists" });
                }
                if (password != cpassword) {
                    return res.status(400).json({
                        msg: "password and confirm password do not match",
                    });
                }
                const newUser = new User({ username, email, password });
                const addUser = await newUser.save();
                if (addUser) {
                    console.log("saved");
                    res.json({ msg: "successfully registered" });
                }
            } catch (err) {
                res.status(500).json({ err: "Server error" });
            }
        }
    }
);

module.exports = router;
