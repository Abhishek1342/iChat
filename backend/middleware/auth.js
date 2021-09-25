const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authUser = async (req, res, next) => {
    const token = req.header("auth-token");
    try {
        if (!token) {
            return res.status(401).json({ err: "Invalid token" });
        }
        const data = jwt.verify(token, process.env.AUTH_TOKEN);
        req.user = data.user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Server error" });
    }
};

module.exports = authUser;
