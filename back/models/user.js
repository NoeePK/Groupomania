const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const roles = require("../config/roles_list");
// ,
    // role: { type: String, default: roles.User },

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
    
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
