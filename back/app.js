const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

// Importer routes
const publicationRoutes = require("./routes/publication");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");

require("dotenv").config();
console.log(process.env);

const app = express();

// Sécurité
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Voir les requêtes
app.use(morgan("tiny"));

const mongoose = require("./database");
const { default: axios } = require("axios");

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

// Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/profiles", profileRoutes);

// app.get("/api", (req, res) => {
//     console.log(req.body);
//     const data = req.body;
//     res.json(data);
// });

module.exports = app;
