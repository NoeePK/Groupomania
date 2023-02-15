const mongoose = require("mongoose");

// Eviter message d'erreur
mongoose.set("strictQuery", false);

// Connexion à la base de données
const mongoDB = mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB : OK"))
    .catch(() => console.log("Connexion à MongoDB : FAIL"));

module.exports = mongoDB;
