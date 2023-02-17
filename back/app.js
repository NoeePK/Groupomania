const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyToken = require("./middlewares/verifyToken");
const cookieParser = require("cookie-parser");
const verifyCredentials = require("./middlewares/verifyCredentials");
const helmet = require("helmet");
const app = express();

// Connexion à la BDD
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectDB = require("./config/db-config");
connectDB();

app.use(verifyCredentials);
app.use(cors(corsOptions));
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "images")));

// Routes pour l'authentification
app.use("/api/auth", require("./routes/auth"));
app.use("/api/refresh", require("./routes/refreshToken"));

// Routes où authentification est obligatoire
app.use(verifyToken);
app.use("/api/profiles", require("./routes/profile"));
app.use("/api/posts", require("./routes/post"));



module.exports = app;
