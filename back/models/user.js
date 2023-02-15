const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const roles = require("../config/roles_list");
const defaultRole = roles.User;

const userSchema = mongoose.Schema({
    firstName: { type: String, minLength: 2, maxLength: 20, required: true },
    lastName: { type: String, minLength: 2, maxLength: 20, required: true },
    birthday: { type: Date },
    service: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 20,
        required: true,
    },
    role: {
        type: Number,
        required: true,
        default: defaultRole,
    },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
