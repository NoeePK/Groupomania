const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Afficher tous les profils
router.get("/profile", auth, profileCtrl.getAllProfiles);

// Créer un profil
router.post("/profile/createProfile", auth, multer, profileCtrl.createProfile);

// Modifier son profil
router.put("/profile/updateProfile", auth, multer, profileCtrl.updateProfile);

// Supprimer son profil
router.delete("/profile/deleteProfile", auth, profileCtrl.deleteProfile);

module.exports = router;
