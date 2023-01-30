const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.role)
            return res.status(401).json({ err: "Aucun rôle attribué" });
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.role);
        const result = req.role
            .map((r) => rolesArray.includes(r))
            .find((val) => val === true);
        if (!result) return res.status(401).json({ err: "Accès non-autorisé" });
        next();
    };
};

module.exports = verifyRoles;
