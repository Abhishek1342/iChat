const express = require("express");
const router = express.Router();

router.post("/login", (req, res, next) => {
    res.send("Login");
});
router.post("/signup", (req, res, next) => {
    res.send("Signup");
});

module.exports = router;
