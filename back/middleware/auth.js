const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

// // Sécuriser les routes
// module.exports = (req, res, next) => {
//     try {
//         // Vérifier si header contient un token
//         const authHeader = req.headers.authorization;
//         if (!authHeader?.startsWith("Bearer"))
//             return res.status(401).json({ err: "Aucun token" });
//         // Récupérer token dans header
//         const token = authHeader.split(" ")[1];

//         // Vérifier token
//         const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);

//         // Récupérer id et rôle
//         const userId = decodedToken.userId;
//         const userRole = decodedToken.userRole;

//         // SI : ID n'est pas valable
//         if (req.body.userId && req.body.userId !== userId) {
//             throw "L'id de l'utilisateur n'est pas valide";
//         } else if (req.body.userRole && req.body.userRole !== userRole) {
//             throw "Accès non-autorisé";
//         }
//         // SINON : ID et role sont valables
//         else {
//             // req.auth = {
//             //     userId: userId,
//             //     userRole: userRole,
//             // };

//             next();
//         }
//         // La requête n'est pas authentifiée
//     } catch (error) {
//         res.status(401).json({ error: "La requête n'est pas authentifiée" });
//         console.log("La requête n'est pas authentifiée");
//     }
// };


// Sécuriser les routes
module.exports = (req, res, next) => {
    try {
        // Récupérer token dans le header
        const token = req.headers.authorization.split(' ')[1];
        // Décoder le token
        const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
        // Récupérer l'id dans le token décodé
        const userId = decodedToken.userId;
        // SI : ID n'est pas valable
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non-valide';
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