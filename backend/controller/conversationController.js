require("../DB/DBConnection");
const Conversation = require("../model/conversation");

// create new conversation function
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/conversation
//AUTHENTICATION REQUIRED

exports.newConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const createdConversation = await newConversation.save();
        res.status(200).json(createdConversation);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Server error" });
    }
};

// get conversation function
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/conversation
//AUTHENTICATION REQUIRED

exports.getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Server error" });
    }
};
