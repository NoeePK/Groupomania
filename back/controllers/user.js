const bcrypt = require("bcrypt");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/User");
require("dotenv").config();

// Inscription
exports.register = (req, res, next) => {
    // Chiffrer l'email
    const emailCryptoJS = cryptoJS
        .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
        .toString();
    // Hasher mdp
    bcrypt
        .hash(req.body.password, 10)
        // Récupérer mdp crypté
        .then((hash) => {
            // Passer data cryptées
            const user = new User({
                email: emailCryptoJS,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                service: req.body.service,
                role: 2001,
            });
            // Enregistrer user dans BDD
            user.save()
                .then(() =>
                    res
                        .status(201)
                        .json({ message: "Nouvel utilisateur enregistré" })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ message: "Erreur serveur" }));
};

// Connexion
exports.login = (req, res, next) => {
    // Chiffrer l'email
    const emailCryptoJS = cryptoJS
        .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
        .toString();

    // Récupérer user correspondant à email
    User.findOne({ email: emailCryptoJS })
        // SI : email n'existe pas
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    error: "refusé",
                    message: "Email ou mot de passe incorrect",
                });
            }
            // SINON : email existe
            bcrypt
                .compare(req.body.password, user.password)
                .then((validPassword) => {
                    // SI : Mot de passe est incorrect
                    if (!validPassword) {
                        return res.status(401).json({
                            message: "Email ou mot de passe incorrect",
                        });
                    }
                    // SINON : Mot de passe est correct
                    else {
                        // ALORS : autoriser accès et attribuer token
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id },
                                {userRole: user.role},

                                `${process.env.JWT_TOKEN}`,

                                { expiresIn: "24h" }
                            ),
                        });
                    }
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// Récupérer tous les profils
exports.getAllProfiles = (req, res, next) => {
    User.find()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ error }));
};

// Récupérer un profil
exports.getOneProfile = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            res.status(200).json({ user });
        })

        .catch((error) => res.status(404).json({ error }));
};

// Récupérer son profil
exports.myself = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken.userId;

        if (!decodedToken) {
            return res
                .status(401)
                .json({ error: "Invalid token", message: "Token invalide" });
        }
        User.findOne({ _id: userId })
            .then((user) => {
                res.status(200).json({ user });
            })
            .catch((error) => res.status(400).json({ error }));
    } catch (error) {
        res.status(402).json({ error });
    }
};

// Modifier son profil
exports.updateMyself = (req, res, next) => {
    const userObject = req.file
        ? {
              ...JSON.parse(req.body.user),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    User.updateOne(
        { _id: req.params.id },
        { ...userObject, _id: req.params.id }
    )
        .then(() =>
            res.status(200).json({
                message: "Modifications du profil enregistrées",
            })
        )
        .catch((error) =>
            res.status(401).json({
                message:
                    "Vous n'avez pas l'autorisation nécessaire pour modifier ce profil",
            })
        );
};

// // Supprimer un profil (uniquement par un admin)
// exports.deleteProfile = (req, res, next) => {
//     Profile.findOne({ _id: req.params.id })
//         .then((profile) => {
//             const filename = profile.imageUrl.split("/images/")[1];
//             // Supprimer image
//             fs.unlink(`images/${filename}`, () => {
//                 // Supprimer profil
//                 Profile.deleteOne({ _id: req.params.id })
//                     .then(() =>
//                         res.status(200).json({
//                             message: "Profil supprimé",
//                         })
//                     )
//                     .catch((error) =>
//                         res.status(401).json({
//                             message:
//                                 "Vous n'avez pas l'autorisation nécessaire pour supprimer ce profil",
//                         })
//                     );
//             });
//         })
//         .catch((error) => res.status(500).json({ error }));
// };
