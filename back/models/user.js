const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const defaultRole = require("../config/roles_list");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 20,
        required: true,
    },
    roles: {
        User: {
            type: Number,
            default: defaultRole.User,
        },
        Admin: {type :Number},
    },
    refreshToken: {type :String},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
