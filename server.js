const express = require("express");
const cors = require("cors");
const app = express();
const env = require("dotenv");
const path = require("path");
const multer = require("multer");
const Socket = require("./Socket");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/Images", express.static(path.join("Images")));
env.config({ path: path.resolve(__dirname, "./.env") });
require("./DB/DBConnection");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

app.use(multer({ storage: storage }).single("profileImage"));

app.options('*',cors())
app.use("/api/", require("./Routes/account"));
app.options('*',cors())
app.use("/api/", require("./Routes/message"));

app.use((req, res, next) => {
    res.status(404).send("Every");
});

const server = app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

//################### SOCKET IO #########################
let user = [];

const newUser = (userId, socketId) => {
    !user.some((user) => user.userId === userId) &&
        user.push({ userId, socketId });
};

const removeUser = (socketId) => {
    user = user.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return user.find((user) => user.userId == userId);
};

const io = require("./Socket").init(server);
io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("newUser", (userId) => {
        newUser(userId, socket.id);
        io.emit("getUser", user);
    });

    //send message

    socket.on("sendMessage", ({ senderId, recieverId, text }) => {
        const reciever = getUser(recieverId);
        io.to(reciever.socketId).emit("getMessage", {
            sender: senderId,
            text,
        });
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
        console.log("a user disconnected");
        io.emit("getUser", user);
    });
});
