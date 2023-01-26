const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");

const credentials = require("./middleware/credentials");

const app = express();

// Sécurité
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Connecter BDD
connectDB();

// Voir les requêtes
app.use(morgan("tiny"));

// Contourner CORS
app.use(credentials);
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    })
);

// Pour voir le contenu des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("http://localhost:8080/api");

// Routes
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/publications", require("./routes/publication"));
app.use("/api/profiles", require("./routes/profile"));
// app.use("api/publication/:id/comments", require("./routes/comments"));
app.use("/logout", require("./routes/logout"));
app.use("/api/auth", require("./routes/user"));

module.exports = app;
