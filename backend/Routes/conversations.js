const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authUser = require("../middleware/auth");
const conversationController = require("../controller/conversationController");

// ROUTE 1 : FOR Creating conversation between two members
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/conversation/
//AUTHENTICATION REQUIRED
router.post("/conversation", authUser, conversationController.newConversation);

// ROUTE 2 : Get conversations
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/conversation/
//AUTHENTICATION REQUIRED
router.get(
    "/conversation/:userId",
    authUser,
    conversationController.getConversation
);

module.exports = router;
