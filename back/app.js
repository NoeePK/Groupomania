const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyToken = require("./middlewares/verifyToken");
const cookieParser = require("cookie-parser");
const verifyCredentials = require("./middlewares/verifyCredentials");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDB = require("./config/db-config")

// Connexion à la BDD
connectDB();
app.use(verifyCredentials);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "images")));

// Routes pour l'authentification
app.use("/register", require("./routes/auth"))
app.use("/login", require("./routes/auth"));
app.use("/logout", require("./routes/auth"));
app.use("/refresh", require("./routes/refreshToken"));

// Routes où authentification est obligatoire
app.use(verifyToken);
app.use("/profiles", require("./routes/profile"))
app.use("/posts", require("./routes/post") )

mongoose.set("strictQuery", false)


module.exports = app;
