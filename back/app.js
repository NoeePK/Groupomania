const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

const publicationRoutes = require("./routes/publication");
const userRoutes = require("./routes/user");

// Environnement
require("dotenv").config();
console.log(process.env);

const app = express();

// Sécurité
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// BDD
const mongoose = require("./dataBase");

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
app.use("/api/auth", userRoutes);

module.exports = app;
