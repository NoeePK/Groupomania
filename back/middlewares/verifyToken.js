const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
// 403 = Forbidden (token invalide)
        if (err) return res.sendStatus(403);
        req.email = decoded.authInfo.email;
        req.roles = decoded.authInfo.roles;
        next();
    });
};

module.exports = verifyToken;
