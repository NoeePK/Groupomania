const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Afficher tous les profils
router.get("/", auth, profileCtrl.getAllProfiles);

// Afficher un profil
router.get("/:id", auth, profileCtrl.getOneProfile);

// Créer un profil
router.post("/createProfile", auth, multer, profileCtrl.createProfile);

// Modifier son profil
router.put("/:id/updateProfile", auth, multer, profileCtrl.updateProfile);

// Supprimer son profil
router.delete("/:id/deleteProfile", auth, profileCtrl.deleteProfile);

module.exports = router;
