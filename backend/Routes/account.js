const express = require("express");
const { body } = require("express-validator");
const User = require("../model/user");
const router = express.Router();
const authUser = require("../middleware/auth");
const accountController = require("../controller/accountController");
const { Router } = require("express");

// ROUTE 1 : FOR USER TO LOGIN
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/login
//NO AUTHENTICATION REQUIRED

router.post(
    "/login",
    [
        body("usernameEmail", "Fill all fields").not().isEmpty(),
        body("password", "Fill all fields").not().isEmpty(),
    ],
    accountController.loginUser
);

// ROUTE 1 : FOR USER TO SIGNUP ACCOUNT
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/signup
//NO AUTHENTICATION REQUIRED

router.post(
    "/signup",
    [
        body("username", "invalid username").not().isEmpty().isString(),
        body("email", "Enter a valid E-mail address").not().isEmpty().isEmail(),
        body("password", "Minimum 6 character")
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
        body("cpassword", "Minimum 6 character")
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
    ],
    accountController.signupUser
);
// ROUTE 1 : FOR USER TO ENTER THERE PROFILE DETAILS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/setprofile
// AUTHENTICATION REQUIRED

router.post(
    "/setProfile",
    [
        body("name", "Invalid Name")
            .not()
            .isEmpty()
            .isAlpha("en-US", { ignore: " " })
            .withMessage("Name must be more than 2 charcters")
            .isLength({ min: 3, max: 20 })
            .withMessage("Name must be less than 20 charcters"),
        body("age", "Invalid Age")
            .isFloat({ min: 1, max: 100 })
            .isLength({ max: 3 }),
        body("gender", "Invalid Gender")
            .not()
            .isEmpty()
            .isAlpha()
            .isLength({ min: 4, max: 6 }),
    ],
    accountController.setProfile
);

router.post("/location", (req, res) => {
    const { longitude, latitude } = req.body;
    console.log(longitude, latitude);
    res.send({ longitude, latitude });
});
module.exports = router;
