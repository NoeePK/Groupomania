const express = require("express");
const router = express.Router();
const publicationCtrl = require("../controllers/sauce");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const slowDown = require("../middleware/speedLimiter");

// Récupération des publications
router.get("/", auth, publicationCtrl.getAllPublications);

// Création d'une publication
router.post("/", auth, slowDown, multer, publicationCtrl.createPublication);

// Modification d'une publication
router.put("/:id", auth, multer, publicationCtrl.modifyPublication);

// Suppression d'une publication
router.delete("/:id", auth, publicationCtrl.deletePublication);

// Système de likes/dislikes
router.post("/:id/like", auth, publicationCtrl.voteForPublication);

module.exports = router;
