const mongoose = require("mongoose");

// Schéma publication
const publicationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pronouns: { type: String },
    service: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: { type: Date, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

module.exports = mongoose.model("Publication", publicationSchema);
