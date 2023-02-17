const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const URI = process.env.DB_URI;

// Connexion à la base de données

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connexion à MongoDB : OK");
    } catch (error) {
        console.log("Connexion à MongoDB : FAIL");
        console.error(error);
    }
};

module.exports = connectDB;
