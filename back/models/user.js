const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const defaultRole = require("../config/roles_list");

const userSchema = mongoose.Schema({
    email: {
        String,
        require: true,
        unique: true,
    },
    password: {
        String,
        minLength: 8,
        maxLength: 20,
        required: true,
    },
    roles: {
        User: {
            Number,
            default: defaultRole.User,
        },
        Admin: Number,
    },
    refreshToken: String,
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
