const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Schéma utilisateur
const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Empêcher email identique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
