const express = require("express");
const router = express.Router();

// Middlewares
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const strongPassword = require("../middlewares/password");

// Controllers
const userCtrl = require("../controllers/user");


// Créer un nouvel utilisateur
router.post("/register", strongPassword, userCtrl.register);
// Connecter un utilisateur
router.post("/login", userCtrl.login);
// Connecter un admin

// Récupérer tous les profils
router.get("/", auth, userCtrl.getAllProfiles);
// Récupérer un profil
router.get("/:id", auth, userCtrl.getOneProfile);
// Récupérer son profil
router.get("/myself", auth, userCtrl.myself);
// Modifier son profil
router.put("/myself", auth, multer, userCtrl.updateMyself);

// Supprimer un profil (uniquement par un admin)

module.exports = router;
