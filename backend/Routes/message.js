const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authUser = require("../middleware/auth");
const messageController = require("../controller/messageController");

// ROUTE 1 : FOR Creating message between two members
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/message/
//AUTHENTICATION REQUIRED

router.post("/message", authUser, messageController.newMessage);

// ROUTE 2 : Get messages
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/message/:id
//AUTHENTICATION REQUIRED

router.get("/message/:id", authUser, messageController.getMessage);

module.exports = router;
