const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");
const multer = require("../middlewares/multer-config");
const defaultUser = process.env.USER;
const ADMIN = process.env.ADMIN;

// Récupérer les post
router.get("/", auth, verifyRoles(defaultUser), postCtrl.getAllPosts);

// Récupérer une post
router.get("/:id", auth, verifyRoles(defaultUser), postCtrl.getOnePost);

// Créer une post
router.post(
    "/publish",
    auth,
    verifyRoles(defaultUser),

    multer,
    postCtrl.createPost
);

// Modifier une post
router.put(
    "/:id/updatePost",
    auth,
    verifyRoles(defaultUser),
    multer,
    postCtrl.updatePost
);

// Supprimer une post
router.delete("/:id/deletePost", auth, verifyRoles(ADMIN), postCtrl.deletePost);

// Système de likes/dislikes
router.post("/:id/like", auth, verifyRoles(defaultUser), postCtrl.voteForPost);

module.exports = router;
