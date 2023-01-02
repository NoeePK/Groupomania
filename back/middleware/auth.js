const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

// Sécuriser les routes
module.exports = (req, res, next) => {
    try {
        // Récupérer token dans header
        const token = req.headers.authorization.split(" ")[1];
        // Décoder token
        const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
        // Récupérer id dans token décodé
        const userId = decodedToken.userId;
        // SI : ID n'est pas valable
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non-valide";
        }
        // SINON : ID est valable
        else {
            next();
        }
        // La requête n'est pas authentifiée
    } catch (error) {
        res.status(401).json({ error: "La requête n'est pas authentifiée" });
    }
};