const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userId: { type: String, required: true },
    imageUrl: { type: String },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    birthday: { type: Date },
    service: { type: String, required: true },
    description: { type: String },
    email: { type: String },
});

module.exports = mongoose.model("Profile", profileSchema);
