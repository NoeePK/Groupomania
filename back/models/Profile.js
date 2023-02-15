const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    firstName: { type: String, minLength: 2, maxLength: 20, required: true },
    lastName: { type: String, minLength: 2, maxLength: 20, required: true },
    birthday: {type :Date},
    service: { type :String, required: true },
    description: {type :String},
    imageUrl: {type :String},
});

module.exports = mongoose.model("Profile", profileSchema);
