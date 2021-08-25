const express = require("express");
require("../DB/DBConnection");
const User = require("../model/user");
const router = express.Router();

router.post("/login", (req, res, next) => {});
router.post("/signup", async (req, res, next) => {
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
});

module.exports = router;
