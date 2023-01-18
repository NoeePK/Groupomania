const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const roles = require("../config/roles_list");

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
    role: { type: String, default: roles.User },
});

// Empêcher email identique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
