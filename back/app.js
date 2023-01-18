const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");

// Connecter BDD
connectDB();

// Importer routes
const publicationRoutes = require("./routes/publication");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
// const commentRoutes = require("./routes/comments");

require("dotenv").config();

const app = express();

// Sécurité
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Voir les requêtes
app.use(morgan("tiny"));

// Contourner CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    })
);


// Pour voir le contenu des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("http://localhost:8080/api");

// Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", userRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/profiles", profileRoutes);
// app.use("api/publication/:id/comments", commentRoutes);

module.exports = app;
