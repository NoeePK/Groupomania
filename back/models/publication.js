const mongoose = require("mongoose");

const publicationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: {type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String },
    date: { type: Date, default: () => { return new Date()}},
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
    comments: { type: [String] },
    commentsAuthor: { type : [String] }
});

module.exports = mongoose.model("Publication", publicationSchema);
