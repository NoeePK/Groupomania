const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

// Schémas
const User = require("./models/user");
const Publication = require("./models/publication");

// Routes
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
app.use(morgan('tiny'))

const mongoose = require("./database");

// Contourner CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    })
);

app.use(express.json());

app.get("/api", (req, res) => {
    const data = {
        user: "noee"
    }
    
    res.json(data);
})

// Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/profiles", profileRoutes);


module.exports = app;
