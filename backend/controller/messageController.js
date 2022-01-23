require("../DB/DBConnection");
const Message = require("../model/message");

// create new message function
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/message
//AUTHENTICATION REQUIRED

exports.newMessage = async (req, res) => {
    let success = false;

    const newMessage = new Message({
        receiver: req.body.receiver,
        sender: req.body.sender,
        text: req.body.text,
    });
    try {
        const createdMessage = await newMessage.save();
        success = true;
        res.status(200).json(success, createdMessage);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Server error" });
    }
};

// get message function
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/message/:id
//AUTHENTICATION REQUIRED

exports.getMessage = async (req, res) => {
    let success = false;
    try {
        const messages = await Message.find({
            $or: [
                {
                    $and: [{ sender: req.user.id, receiver: req.params.id }],
                    $and: [{ receiver: req.user.id, sender: req.params.id }],
                },
            ],
        });
        if (messages) {
            success = true;
            res.status(200).json(success, messages);
        } else {
            success = true;
            res.status(200).json(success, "No messages found");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Server error" });
    }
};
