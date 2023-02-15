const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    firstName: { String, minLength: 2, maxLength: 20, required: true },
    lastName: { String, minLength: 2, maxLength: 20, required: true },
    birthday: Date,
    service: { String, required: true },
    description: String,
    imageUrl: String,
});

module.exports = mongoose.model("Profile", profileSchema);
