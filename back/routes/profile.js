const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile");
const auth = require("../middleware/auth");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const multer = require("../middleware/multer-config");

// Afficher tous les profils
router.get("/", auth, verifyRoles(ROLES_LIST.User), profileCtrl.getAllProfiles);

// Afficher un profil
router.get(
    "/:id",
    auth,
    verifyRoles(ROLES_LIST.User),
    profileCtrl.getOneProfile
);

// Créer un profil
router.post(
    "/createProfile",
    auth,
    verifyRoles(ROLES_LIST.User),
    multer,
    profileCtrl.createProfile
);

// Modifier son profil
router.put(
    "/:id/updateProfile",
    auth,
    verifyRoles(ROLES_LIST.User),
    multer,
    profileCtrl.updateProfile
);

// Supprimer son profil
router.delete(
    "/:id/deleteProfile",
    auth,
    verifyRoles(ROLES_LIST.Admin),
    profileCtrl.deleteProfile
);

module.exports = router;
