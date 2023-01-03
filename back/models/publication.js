const mongoose = require("mongoose");

// Schéma publication
const publicationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String },
    date: { type: Date, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

module.exports = mongoose.model("Publication", publicationSchema);
