const Profile = require("../models/profile");
const fs = require("fs");

// Récupérer tous les profils
exports.getAllProfiles = (req, res, next) => {
    Profile.find()
        .then((profiles) => res.status(200).json(profiles))
        .catch((error) => res.status(400).json({ error }));
};

// Récupérer un profil
exports.getOneProfile = (req, res, next) => {
    Profile.findOne({ _id: req.params.id })
        .then((profile) => res.status(200).json(profile))
        .catch((error) => res.status(404).json({ error }));
};

// Créer profil
exports.createProfile = (req, res, next) => {
    const profileObject = JSON.parse(req.body.profile);
    const profile = new Profile({
        profileObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    });
    profile
        .save()
        .then(() => {
            res.status(201).json({
                message: "Profil créé",
            });
        })
        .catch((error) => res.status(400).json({ error }));
};

// Modifier profil
exports.updateProfile = (req, res, next) => {
    const profileObject = req.file
        ? {
              ...JSON.parse(req.body.profile),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    Profile.updateOne(
        { _id: req.params.id },
        { ...profileObject, _id: req.params.id }
    ).then(() =>
        res
            .status(200)
            .json({
                message: "Profil modifié",
            })
            .catch((error) =>
                res.status(401).json({
                    message:
                        "Vous n'avez pas l'autorisation nécessaire pour modifier ce profil",
                })
            )
    );
};

// Supprimer profil
exports.deleteProfile = (req, res, next) => {
    Profile.findOne({ _id: req.params.id })
        .then((profile) => {
            const filename = profile.imageUrl.split("/images/")[1];
            // Supprimer image
            fs.unlink(`images/${filename}`, () => {
                // Supprimer profil
                Profile.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({
                            message: "Profil supprimé",
                        })
                    )
                    .catch((error) =>
                        res.status(401).json({
                            message:
                                "Vous n'avez pas l'autorisation nécessaire pour supprimer ce profil",
                        })
                    );
            });
        })
        .catch((error) => res.status(500).json({ error }));
};
