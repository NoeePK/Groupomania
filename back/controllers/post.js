const Post = require("../models/Post");
const fs = require("fs");

// Récupérer toutes les posts
exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({ error }));
};

// Récupérer une post
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(404).json({ error }));
};

// Créer une post
exports.createPost = (req, res, next) => {
    // Récupérer données du front
    const postObject = JSON.parse(req.body.post);
    // Supprimer id en surplus
    delete postObject._id;
    // Créer post
    const post = new Post({
        ...postObject,
        // Générer une URL pour l'image
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    });
    // Sauvegarder post
    post
        .save()
        .then(() => {
            res.status(201).json({
                message: "Post ajoutée",
            });
        })
        .catch((error) => res.status(400).json({ error }));
};

// Modifier post
exports.updatePost = (req, res, next) => {
    const postObject = req.file
        ? {
              ...JSON.parse(req.body.post),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    Post.updateOne(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id }
    )
        .then(() =>
            res.status(200).json({
                message: "Modifications enregistrées",
            })
        )
        .catch((error) =>
            res.status(401).json({
                message:
                    "Vous n'avez pas l'autorisation nécessaire pour modifier cette post",
            })
        );
};

// Supprimer post
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            const filename = post.imageUrl.split("/images/")[1];
            // Supprimer image
            fs.unlink(`images/${filename}`, () => {
                // Supprimer post
                Post.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({
                            message: "Post supprimée",
                        })
                    )
                    .catch((error) =>
                        res.status(401).json({
                            message:
                                "Vous n'avez pas l'autorisation nécessaire pour supprimer cette post",
                        })
                    );
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

// Likes/dislikes
exports.voteForPost = (req, res, next) => {
    // SI : User aime post
    if (req.body.like === 1) {
        // ALORS : + 1 dans array usersLiked
        Post.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: +1 },
                $push: { usersLiked: req.body.userId },
            }
        )
            .then((post) =>
                res
                    .status(200)
                    .json({ message: "Vous avez liké cette post" })
            )
            .catch((error) => res.status(400).json({ error }));
    }
    // SINON SI : User n'aime pas post
    else if (req.body.like === -1) {
        // ALORS : + 1 dans array usersDisliked
        Post.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId },
            }
        )
            .then((post) =>
                res
                    .status(200)
                    .json({ message: "Vous avez disliké cette post" })
            )
            .catch((error) => res.status(400).json({ error }));
    }
    // SINON : User a déjà voté pour post
    else {
        Post.findOne({ _id: req.params.id })
            .then((post) => {
                // SI : userId présent dans userLiked
                if (post.usersLiked.includes(req.body.userId)) {
                    // ALORS : - 1 dans usersLiked
                    Post.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 },
                        }
                    )
                        .then((post) => {
                            res.status(200).json({
                                message: "Like supprimé",
                            });
                        })
                        .catch((error) => res.status(400).json({ error }));
                }
                // SINON SI : userId présent dans usersDisliked
                else if (post.usersDisliked.includes(req.body.userId)) {
                    // ALORS : - 1 dans usersDisliked
                    Post.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 },
                        }
                    )
                        .then((post) => {
                            res.status(200).json({
                                message: "Dislike supprimé",
                            });
                        })
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json(" error"));
    }
};
