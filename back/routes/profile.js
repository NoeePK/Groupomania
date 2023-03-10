const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profiles");
const defaultUser = process.env.USER;
const ADMIN = process.env.ADMIN;
const verifyRoles = require("../middlewares/verifyRoles");


// Récupérer tous les profils
router.get("/", profileCtrl.getAllProfiles);

// Récupérer un profil
router.get("/:id", profileCtrl.getOneProfile);

// Créer un profil
router.post("/createProfile", profileCtrl.createProfile);

// WIP: mettre contrôle pour empêcher modif par autre que proprio du profil ?
// Modifier un profil
router.put("/updateProfile", profileCtrl.updateProfile);

// Supprimer un profil (uniquement par un admin)
router.delete(
    "/deleteProfile",
    verifyRoles(ADMIN),
    profileCtrl.deleteProfile
);

module.exports = router;
