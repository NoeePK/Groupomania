const express = require("express");
const router = express.Router();

const strongPassword = require("../middlewares/verifyPassword");
const authCtrl = require("../controllers/auth");

// Créer un nouvel utilisateur
router.post("/", strongPassword, authCtrl.register);

module.exports = router;
