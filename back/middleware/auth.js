const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

// Sécuriser les routes
module.exports = (req, res, next) => {
    try {
        // Vérifier si header contient un token
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer"))
            return res.status(401).json({ err: "Aucun token" });
        // Récupérer token dans header
        const token = authHeader.split(" ")[1];

        // Vérifier token
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_TOKEN,
            (err, decoded) => {
                if (err) {
                    return res
                        .sendstatus(403)
                        .json({ err: "Token non-valide" });
                } else {
                    next();
                }
            }
        );

        // Récupérer id et rôle
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;

        // SI : ID n'est pas valable
        if (req.body.userId && req.body.userId !== userId) {
            throw "L'id de l'utilisateur n'est pas valide";
        }
        // SINON : ID est valable
        else {
            req.auth = {
                userId: userId,
                userRole: userRole,
            };

            next();
        }
        // La requête n'est pas authentifiée
    } catch (error) {
        res.status(401).json({ error: "La requête n'est pas authentifiée" });
        console.log("La requête n'est pas authentifiée");
    }
};
