const express = require("express");
const router = express.Router();
const publicationCtrl = require("../controllers/publication");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const slowDown = require("../middleware/speedLimiter");

// Récupérer les publications
router.get("/", auth, publicationCtrl.getAllPublications);

// Créer une publication
router.post("/", auth, slowDown, multer, publicationCtrl.createPublication);

// Modifier une publication
router.put("/:id", auth, multer, publicationCtrl.modifyPublication);

// Supprimer une publication
router.delete("/:id", auth, publicationCtrl.deletePublication);

// Système de likes/dislikes
router.post("/:id/like", auth, publicationCtrl.voteForPublication);

// Récupérer les commentaires
router.get("/:id/comments", auth, publicationCtrl.getComments);

// Ajouter un commentaire
router.post("/:id/comments", auth, publicationCtrl.createComments);

// Modifier un commentaire
router.put("/comments/:id", auth, publicationCtrl.updateComments);

// Supprimer un commentaire
router.delete("/comments/:id", auth, publicationCtrl.deleteComments);

module.exports = router;
