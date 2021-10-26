const express = require("express");
const cors = require("cors");
const app = express();
const env = require("dotenv");
const path = require("path");
const multer = require("multer");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

env.config({ path: path.resolve(__dirname, "./.env") });
require("./DB/DBConnection");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Images/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

app.use(multer({ storage: storage }).single("profileImage"));

app.use("/api/", require("./Routes/account"));

app.use((req, res, next) => {
    res.status(404).send("Every");
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
