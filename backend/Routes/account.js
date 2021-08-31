const express = require("express");
const { body, validationResult } = require("express-validator");
require("../DB/DBConnection");
const User = require("../model/user");
const router = express.Router();

router.post("/login", (req, res, next) => {});
router.post(
    "/signup",
    body("username").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isLength({ min: 6 }),
    body("cpassword").notEmpty().isLength({ min: 6 }),
    async (req, res, next) => {
        console.log("hit");
        const { username, email, password, cpassword } = req.body;
        try {
            const newUser = new User({ username, email, password });
            const addUser = await newUser.save();
            if (addUser) {
                console.log("saved");
                res.json({ message: "saved" });
            }
        } catch (err) {
            res.send(err);
        }
    }
);

module.exports = router;
