const express = require("express");
const router = express.Router();

const strongPassword = require("../middlewares/verifyPassword");
const authCtrl = require("../controllers/auth");

// Créer un nouvel utilisateur
router.post("/register", strongPassword, authCtrl.register);
// Connecter un utilisateur
router.post("/login", authCtrl.login);
// Déconnecter un utilisateur
router.get("/logout", authCtrl.logout);

module.exports = router;
