const mongoose = require("mongoose");
const dotenv = require("dotenv");
const result = dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connexion à MongoDB : OK");
    } catch (error) {
        console.log("Connexion à MongoDB : FAIL");
    }
};

module.exports = connectDB;
