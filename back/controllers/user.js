const bcrypt = require("bcrypt");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const dotenv = require("dotenv");
const result = dotenv.config();

// Inscription
exports.register = (req, res, next) => {
    // Crypter email
    const emailCryptoJS = cryptoJS
        .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
        .toString();
    // Hasher mdp
    bcrypt
        .hash(req.body.password, 10)
        // Récupérer mdp crypté
        .then((hash) => {
            // Création user
            const user = new User({
                email: emailCryptoJS,
                password: hash,
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
        .catch((error) => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res, next) => {
    // Chiffrer email
    const emailCryptoJS = cryptoJS
        .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
        .toString();

    // Récupérer user correspondant à email
    User.findOne({ email: emailCryptoJS })
        // SI : email n'existe pas
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Email ou mot de passe incorrect" });
            }
            // SINON : email existe
            else {
                // Comparer mdp et hash dans BDD
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
                                    `${process.env.JWT_TOKEN}`,
                                    { expiresIn: "24h" }
                                ),
                            });
                        }
                    });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
