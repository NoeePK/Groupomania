const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

// Connecter un utilisateur
router.post("/", authCtrl.login);

module.exports = router;
