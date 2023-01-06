const express = require("express");
require("dotenv").config();
const mongoose = require("./dataBase");
// Bodyparser ?
const app = express();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const publicationRoutes = require("./routes/publication");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");

// Sécurité
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    })
);

app.use(express.json());

// Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/publications", publicationRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
