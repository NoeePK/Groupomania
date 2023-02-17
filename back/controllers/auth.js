require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Inscription
const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({
            message: "Un courriel et un mot de passe sont nécessaires",
        });

    try {
        const cryptedEmail = await cryptoJS
            .HmacSHA256(email, process.env.CRYPTO_EMAIL)
            .toString();

        const hashedPwd = await bcrypt.hash(password, 10);

        // Enregistrer le nouvel utilisateur
        const result = await User.create({
            email: cryptedEmail,
            roles: { User: 2001 },
            password: hashedPwd,
        });

        console.log(result);

        res.status(201).json({
            success: `Votre email ${email} a été enregistré avec succès ! `,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Connexion
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({
            message: "Un courriel et un mot de passe sont nécessaires",
        });

    const cryptedEmail = await cryptoJS
        .HmacSHA256(email, process.env.CRYPTO_EMAIL)
        .toString();

    const matchedUser = await User.findOne({ email: cryptedEmail }).exec();
    // SI : email non-trouvé
    if (!matchedUser) return res.sendStatus(401);

    const matchPwd = await bcrypt.compare(password, matchedUser.password);

    // SI : correspondance trouvée
    if (matchPwd) {
        const roles = Object.values(matchedUser.roles).filter(Boolean);
        // Créer token
        const accessToken = jwt.sign(
            {
                authInfo: {
                    email: matchedUser.email,
                    roles: roles,
                },
            },
            process.env.JWT_TOKEN,
            { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
            { email: matchedUser.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: "12h" }
        );
        // Attribuer refreshToken à l'utilisateur
        matchedUser.refreshToken = refreshToken;
        const result = await matchedUser.save();
        console.log(result);
        console.log(roles);

        //  Créer un cookie avec ce token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 12 * 60 * 60 * 1000,
        });

        // Send authorization roles and access token to user
        res.json({ roles, accessToken });
    }
    // SINON : Mot de passe ne correspond pas
    else {
        res.sendStatus(401);
    }
};

// Déconnexion
const logout = async (req, res) => {
    const cookies = req.cookies;
    // Supprimer les cookies
    if (!cookies?.jwt) return res.sendStatus(204);
};

module.exports = { register, login, logout };
