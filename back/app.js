const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

// Sécurité
const helmet = require("helmet");
app.use(helmet());
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", require("./routes/user"));
app.use("/api/publication", require("./routes/publication"));

module.exports = app;
