const express = require("express");
const router = express.Router();
const publicationCtrl = require("../controllers/publication");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const slowDown = require("../middleware/speedLimiter");

// Récupérer les publication
router.get("/publication", auth, publicationCtrl.getAllPublications);

// Récupérer une publication
router.get("/publication/:id", auth, publicationCtrl.getOnePublication);

// Créer une publication
router.post(
    "/publication/createPublication",
    auth,
    slowDown,
    multer,
    publicationCtrl.createPublication
);

// Modifier une publication
router.put(
    "/publication/:id",
    auth,
    multer,
    publicationCtrl.modifyPublication
);

// Supprimer une publication
router.delete("/publication/:id", auth, publicationCtrl.deletePublication);

// Système de likes/dislikes
router.post("/publication/:id/like", auth, publicationCtrl.voteForPublication);

// // Récupérer les commentaires
// router.get("publication/:id/comments", auth, publicationCtrl.getComments);

// // Ajouter un commentaire
// router.post("publication/:id/comments", auth, publicationCtrl.createComments);

// // Modifier un commentaire
// router.put(
//     "publication/:id/comments/:id",
//     auth,
//     publicationCtrl.updateComments
// );

// // Supprimer un commentaire
// router.delete(
//     "publication/:id/comments/:id",
//     auth,
//     publicationCtrl.deleteComments
// );

module.exports = router;
