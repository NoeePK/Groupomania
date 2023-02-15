const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

// Connexion à la BDD
require("./middlewares/db-config.js");

// Sécurité
const helmet = require("helmet");
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
