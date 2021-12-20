const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("../DB/DBConnection");
const User = require("../model/user");
const FriendRequest = require("../model/friendRequests");

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
    try {
        const { name, age, gender, longitude, latitude } = req.body;
        const url = req.protocol + "://" + req.get("host");
        let profileImage = "";
        const file = req.file;
        if (file) {
            profileImage = url + "/images/" + file.filename;
        }
        const user = await User.findById(req.user.id);
        const updateUser = await user.updateOne({
            name,
            age,
            gender,
            longitude,
            latitude,
            profileImage,
            profileCompleted: true,
        });
        success = true;
        res.status(200).json({
            success,
            msg: "Profile submitted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Server error" });
    }
};

//  TO GET CURRENT USER DETAILS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/currentuser
// AUTHENTICATION REQUIRED

exports.currentUser = async (req, res) => {
    let success = false;
    try {
        const userID = req.user.id;
        const user = await User.findById(userID);
        if (user) {
            success = true;
            res.status(200).json({ success, user, msg: "user fetched" });
        } else {
            res.status(404).json({ success, msg: "user not fetched" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Server error" });
    }
};

// ROUTE 4 : FOR USER TO SEARCH GLOBAL USER LIST
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/searchuser
// AUTHENTICATION REQUIRED

exports.searchUser = async (req, res) => {
    let success = false;
    try {
        const search = req.body.search;
        const user = await User.find({
            name: { $regex: search, $options: "i" },
        })
            .where("_id")
            .ne(req.user.id)
            .select(["-password"]);
        if (user) {
            success = true;
            res.status(200).json({ user, success, msg: "user found" });
        } else {
            res.status(404).json({ success, msg: "user not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Server error" });
    }
};

// ROUTE 5 : FOR USER TO SEND FRIEND REQUESTS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/friendrequest
// AUTHENTICATION REQUIRED

exports.friendRequest = async (req, res) => {
    let success = false;
    try {
        const toUser = req.body.toUser;
        const fromUser = req.user.id;
        const existfriendRqust = await FriendRequest.find({
            $or: [
                { to: toUser, from: fromUser },
                { to: fromUser, from: toUser },
            ],
        });
        console.log(existfriendRqust);
        if (toUser != fromUser) {
            if (existfriendRqust.length > 0) {
                success = false;
                res.status(400).json({ msg: "Already sent friend request" });
            } else {
                const newFriendRequest = new FriendRequest({
                    from: fromUser,
                    to: toUser,
                });
                const friendRequest = await newFriendRequest.save();
                sucess = true;
                res.status(200).json({
                    sucess,
                    msg: "Successfuly sent friend request",
                });
            }
        } else {
            success = false;
            res.status(400).json({
                msg: "Can't send friend request to yourself",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Server error" });
    }
};

// ROUTE 6 : FOR USER TO SEE ALL FRIEND REQUESTS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/friendrequest
// AUTHENTICATION REQUIRED

exports.getAllFriendRequests = async (req, res) => {
    let success = false;
    try {
        const user = req.user.id;
        const foundRequests = await FriendRequest.find({ to: user });

        if (foundRequests.length > 0) {
            const friendRequests = [];
            for (let i = 0; i < foundRequests.length; i++) {
                try {
                    const friendRequestUser = await User.findById(
                        foundRequests[i]?.from
                    );
                    success = true;
                    friendRequests.push(friendRequestUser);
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({
                success,
                friendRequests,
                msg: "Friend Request Found",
            });
        } else {
            return res
                .status(400)
                .json({ success, msg: "Friend Request Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Server error" });
    }
};

// ROUTE 7 : FOR USER TO SEE ALL GLOBAL NON FRIEND USER WHO HAS NOT EVEN RECIEVED OR SEND REQUESTS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/filtereduser
// AUTHENTICATION REQUIRED

exports.filtereduser = async (req, res) => {
    try {
        const user = req.user.id;
        const filteredFriendRequests = await FriendRequest.find({
            $or: [{ to: user }, { from: user }],
        });
        const filteredUser = [];

        const allUser = await User.find().select(["-password"]);
        allUser.map((item) => {
            filteredFriendRequests.map((request) => {});
        });
        console.log(allUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Server error" });
    }
};
