const Publication = require("../models/publication");
const fs = require("fs");

// Récupérer toutes les publications
exports.getAllPublications = (req, res, next) => {
    Publication.find()
        .then((publications) => res.status(200).json(publications))
        .catch((error) => res.status(400).json({ error }));
};

// Récupérer une publication
exports.getOnePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then((publication) => res.status(200).json(publication))
        .catch((error) => res.status(404).json({ error }));
};

// Créer une publication
exports.createPublication = (req, res, next) => {
    // Récupérer données du front
    const publicationObject = JSON.parse(req.body.publication);
    // Supprimer id en surplus
    delete publicationObject._id;
    // Créer publication
    const publication = new Publication({
        ...publicationObject,
        // Générer une URL pour l'image
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    });
    // Sauvegarder publication
    publication
        .save()
        .then(() => {
            res.status(201).json({
                message: "Publication ajoutée",
            });
        })
        .catch((error) => res.status(400).json({ error }));
};

// Modifier publication
exports.modifyPublication = (req, res, next) => {
    const publicationObject = req.file
        ? {
              ...JSON.parse(req.body.publication),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    Publication.updateOne(
        { _id: req.params.id },
        { ...publicationObject, _id: req.params.id }
    )
        .then(() =>
            res.status(200).json({
                message: "Modifications enregistrées",
            })
        )
        .catch((error) =>
            res.status(401).json({
                message:
                    "Vous n'avez pas l'autorisation nécessaire pour modifier cette publication",
            })
        );
};

// Supprimer publication
exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then((publication) => {
            const filename = publication.imageUrl.split("/images/")[1];
            // Supprimer image
            fs.unlink(`images/${filename}`, () => {
                // Supprimer publication
                Publication.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({
                            message: "Publication supprimée",
                        })
                    )
                    .catch((error) =>
                        res.status(401).json({
                            message:
                                "Vous n'avez pas l'autorisation nécessaire pour supprimer cette publication",
                        })
                    );
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

// Likes/dislikes
exports.voteForPublication = (req, res, next) => {
    // SI : User aime publication
    if (req.body.like === 1) {
        // ALORS : + 1 dans array usersLiked
        Publication.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: +1 },
                $push: { usersLiked: req.body.userId },
            }
        )
            .then((publication) =>
                res
                    .status(200)
                    .json({ message: "Vous avez liké cette publication" })
            )
            .catch((error) => res.status(400).json({ error }));
    }
    // SINON SI : User n'aime pas publication
    else if (req.body.like === -1) {
        // ALORS : + 1 dans array usersDisliked
        Publication.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId },
            }
        )
            .then((publication) =>
                res
                    .status(200)
                    .json({ message: "Vous avez disliké cette publication" })
            )
            .catch((error) => res.status(400).json({ error }));
    }
    // SINON : User a déjà voté pour publication
    else {
        Publication.findOne({ _id: req.params.id })
            .then((publication) => {
                // SI : userId présent dans userLiked
                if (publication.usersLiked.includes(req.body.userId)) {
                    // ALORS : - 1 dans usersLiked
                    Publication.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 },
                        }
                    )
                        .then((publication) => {
                            res.status(200).json({
                                message: "Like supprimé",
                            });
                        })
                        .catch((error) => res.status(400).json({ error }));
                }
                // SINON SI : userId présent dans usersDisliked
                else if (publication.usersDisliked.includes(req.body.userId)) {
                    // ALORS : - 1 dans usersDisliked
                    Publication.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 },
                        }
                    )
                        .then((publication) => {
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
