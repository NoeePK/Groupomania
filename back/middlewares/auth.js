const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Nouvelle version
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);

        const userId = decodedToken.userId;

        let user = await User.findById(userId)
            .then((user) => user)
            .catch((error) => res.status(500).json({ error }));

        req.auth = {
            userId: userId,
            userRole: user.role,
        };
        next();
    } catch (error) {
        res.status(401).json({
            error,
            message: "La requête n'est pas authentifiée",
        });
    }
};
