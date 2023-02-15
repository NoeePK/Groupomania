const User = require("../model/User");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const matchedUser = await User.findOne({ refreshToken }).exec();
    if (!matchedUser) return res.sendStatus(403); //Forbidden
    // Vérifier token
    jwt.verify(refreshToken, process.env.JWT_TOKEN, (err, decoded) => {
        if (err || matchedUser.username !== decoded.username)
            return res.sendStatus(403);
        const roles = Object.values(matchedUser.roles);
        const accessToken = jwt.sign(
            {
                authInfo: {
                    email: decoded.username,
                    roles: roles,
                },
            },
            process.env.JWT_TOKEN,
            { expiresIn: "30s" }
        );
        res.json({ roles, accessToken });
    });
};

module.exports = { refreshToken };
