const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile");

// Afficher tous les profils
router.get("/", auth, profileCtrl.getAllProfiles);
// Créer un profil
router.post("/createProfile", auth, profileCtrl.createProfile);
// Modifier son profil
router.put("/updateProfile", auth, profileCtrl.updateProfile);
// Supprimer son profil
router.delete("/deleteProfile", auth, profileCtrl.deleteProfile);

module.exports = router;
