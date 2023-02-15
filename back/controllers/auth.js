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
            .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
            .toString();

        const hashedPwd = await bcrypt.hash(password, 10);

        // Enregistrer le nouvel utilisateur
        const result = await User.create({
            email: cryptedEmail,
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
        .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
        .toString();

    const matchedUser = await User.findOne({ email: cryptedEmail }).exec();
    if (!matchedUser) return res.sendStatus(401); //Unauthorized

    // evaluate password
    const matchPwd = await bcrypt.compare(password, matchedUser.password);
    if (matchPwd) {
        const roles = Object.values(matchedUser.roles).filter(Boolean);
        // Attribuer token
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
            process.env.JWT_TOKEN,
            { expiresIn: "12h" }
        );
        // Saving refreshToken with current user
        matchedUser.refreshToken = refreshToken;
        const result = await matchedUser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 12 * 60 * 60 * 1000,
        });

        // Send authorization roles and access token to user
        res.json({ roles, accessToken });
    } else {
        res.sendStatus(401);
    }
};

// Déconnexion
const logout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const matchedUser = await User.findOne({ refreshToken }).exec();
    if (!matchedUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    matchedUser.refreshToken = "";
    const result = await matchedUser.save();
    console.log(result);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
};

module.exports = { register, login, logout };
