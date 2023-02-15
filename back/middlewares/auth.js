const jwt = require("jsonwebtoken");

// Nouvelle version
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;
        req.auth = {
            userId,
            userRole,
        };

        console.log("token :", token);
        console.log("decodedToken :", decodedToken);
        console.log("userId :", userId);

        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error,
            message: "La requête n'est pas authentifiée",
        });
    }
};
