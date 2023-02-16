const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

// Déconnecter un utilisateur
router.get("/", authCtrl.logout);

module.exports = router;
