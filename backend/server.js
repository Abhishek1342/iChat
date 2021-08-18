const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Ichat");
});

app.listen("3000", () => {
    console.log("app on local 3000");
});
