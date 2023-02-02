const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

// Sécurité
const helmet = require("helmet");
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());

// Contourner CORS
const cors = require("cors");
// const corsOptions = {
//     origin: "http://localhost:3000",
//     credentials: true,
//     optionSuccessStatus: 200,
// };

app.use(cors());

// Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", require("./routes/user"));


module.exports = app;
