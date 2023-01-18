const user = require("./user");
const path = require("path");

module.exports = (req, res, next) => {
    // Récupérer token dans header
    const token = req.headers.authorization.split(" ")[1];
    // !!! supprimer aussi côté front
    if (token) {
    }
};

