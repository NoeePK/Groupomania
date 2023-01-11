const express = require("express");
const router = express.Router();
const publicationCtrl = require("../controllers/publication");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const slowDown = require("../middleware/speedLimiter");

// Récupérer les publication
router.get("/", auth, publicationCtrl.getAllPublications);

// Récupérer une publication
router.get("/:id", auth, publicationCtrl.getOnePublication);

// Créer une publication
router.post("/Publish", auth, slowDown, multer, publicationCtrl.publish);

// Modifier une publication
router.put(
    "/:id/updatePublication",
    auth,
    multer,
    publicationCtrl.updatePublication
);

// Supprimer une publication
router.delete(
    "/:id/deletePublication",
    auth,
    publicationCtrl.deletePublication
);

// Système de likes/dislikes
router.post("/:id/like", auth, publicationCtrl.voteForPublication);

module.exports = router;
