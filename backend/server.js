const express = require("express");
const app = express();
const env = require("dotenv");
const path = require("path");

env.config({ path: path.resolve(__dirname, "./.env") });
require("./DB/DBConnection");

app.get("/", (req, res) => {
    res.send("Ichat");
});

app.listen("3000", () => {
    console.log("app on local 3000");
});
