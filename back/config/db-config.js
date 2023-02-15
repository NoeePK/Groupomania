const mongoose = require("mongoose");

// Connexion à la base de données

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
    } catch (error) {
        console.log("Connexion à MongoDB : FAIL");
        console.error(error);
    }
};

module.exports = connectDB;
