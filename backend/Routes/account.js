const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authUser = require("../middleware/auth");
const accountController = require("../controller/accountController");

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

// ROUTE 2 : FOR USER TO SIGNUP ACCOUNT
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
// ROUTE 3 : FOR USER TO ENTER THERE PROFILE DETAILS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/setprofile
// AUTHENTICATION REQUIRED

router.post(
    "/set-profile",
    authUser,
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

// ROUTE 4 : FOR USER TO SEARCH GLOBAL USER LIST
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/searchuser
// AUTHENTICATION REQUIRED

router.post(
    "/searchuser",
    authUser,

    accountController.searchUser
);

// ROUTE 5 : TO GET CURRENT USER DETAILS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/currentuser
// AUTHENTICATION REQUIRED

router.get("/currentuser", authUser, accountController.currentUser);

// ROUTE 6 : FOR USER TO SEND FRIEND REQUESTS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/friendrequest
// AUTHENTICATION REQUIRED

router.post("/friendrequest", authUser, accountController.friendRequest);

// ROUTE 7 : FOR USER TO SEE ALL FRIEND REQUESTS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/friendrequest
// AUTHENTICATION REQUIRED

router.get("/friendrequest", authUser, accountController.getAllFriendRequests);

// ROUTE 8 : FOR USER TO ACCEPT FRIEND REQUESTS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/acceptrequest
// AUTHENTICATION REQUIRED
router.post("/acceptrequest", authUser, accountController.acceptRequest);

// ROUTE 9 : FOR USER TO CANCEL FRIEND REQUESTS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/cancelrequest
// AUTHENTICATION REQUIRED

router.post("/cancelrequest", authUser, accountController.cancelRequest);

// ROUTE 10 : FOR USER TO SEE ALL GLOBAL NON FRIEND USER WHO HAS NOT EVEN RECIEVED OR SEND REQUESTS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/filtereduser
// AUTHENTICATION REQUIRED

router.get("/filtereduser", authUser, accountController.filtereduser);

// ROUTE 11 : FOR USER TO SEE ALL FRIENDS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/friends
// AUTHENTICATION REQUIRED
router.get("/friends", authUser, accountController.allFriends);

module.exports = router;
