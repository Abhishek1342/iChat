const express = require("express");
const router = express.Router();
const validator

router.post("/login", (req, res, next) => {});
router.post("/signup", (req, res, next) => {
    const { email, password, cpassword } = req.body;
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;
