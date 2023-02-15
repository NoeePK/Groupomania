const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        req.user = decoded.UserInfo.userId;
        req.roles = decoded.UserInfo.userRole;
        next();
    });
};

module.exports = verifyToken;
