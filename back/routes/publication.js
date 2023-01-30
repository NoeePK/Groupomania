const express = require("express");
const router = express.Router();
const publicationCtrl = require("../controllers/publication");
const auth = require("../middlewares/auth");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middlewares/verifyRoles");
const multer = require("../middlewares/multer-config");

// Récupérer les publication
router.get(
    "/",
    auth,
    verifyRoles(ROLES_LIST.User),
    publicationCtrl.getAllPublications
);

// Récupérer une publication
router.get(
    "/:id",
    auth,
    verifyRoles(ROLES_LIST.User),
    publicationCtrl.getOnePublication
);

// Créer une publication
router.post(
    "/publish",
    auth,
    verifyRoles(ROLES_LIST.User),

    multer,
    publicationCtrl.publish
);

// Modifier une publication
router.put(
    "/:id/updatePublication",
    auth,
    verifyRoles(ROLES_LIST.User),
    multer,
    publicationCtrl.updatePublication
);

// Supprimer une publication
router.delete(
    "/:id/deletePublication",
    auth,
    verifyRoles(ROLES_LIST.User),
    publicationCtrl.deletePublication
);

// Système de likes/dislikes
router.post(
    "/:id/like",
    auth,
    verifyRoles(ROLES_LIST.User),
    publicationCtrl.voteForPublication
);

module.exports = router;
