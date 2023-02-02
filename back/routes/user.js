const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const strongPassword = require("../middlewares/password");

// Créer un nouvel utilisateur
router.post("/register", strongPassword, userCtrl.register);
// Connecter un utilisateur
router.post("/login", userCtrl.login);
// Connecter un admin

// Récupérer tous les profils
router.get("/profile", auth, userCtrl.getAllProfiles);
// Récupérer un profil
router.get("/profile/:id", auth, userCtrl.getOneProfile);
// Récupérer son profil
router.get("/myself", auth, userCtrl.myself);
// Modifier son profil
router.put("/myself", auth, multer, userCtrl.updateMyself);

// Supprimer un profil (uniquement par un admin)

module.exports = router;
