const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const axios = require("axios");
const mongoose = require("./dataBase");

const publicationRoutes = require("./routes/publication");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");

// Environnement
require("dotenv").config();

const app = express();

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
