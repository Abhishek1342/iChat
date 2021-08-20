const express = require("express");
const app = express();
const env = require("dotenv");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.json());

env.config({ path: path.resolve(__dirname, "./.env") });
require("./DB/DBConnection");

app.use("/api/", require("./Routes/account"));

app.use((req, res, next) => {
    res.status(404).send("Every");
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
