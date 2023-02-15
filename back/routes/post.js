const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middlewares/verifyToken");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middlewares/verifyRoles");
const multer = require("../middlewares/multer-config");

// Récupérer les post
router.get("/", auth, verifyRoles(ROLES_LIST.User), postCtrl.getAllPosts);

// Récupérer une post
router.get("/:id", auth, verifyRoles(ROLES_LIST.User), postCtrl.getOnePost);

// Créer une post
router.post(
    "/publish",
    auth,
    verifyRoles(ROLES_LIST.User),

    multer,
    postCtrl.createPost
);

// Modifier une post
router.put(
    "/:id/updatePost",
    auth,
    verifyRoles(ROLES_LIST.User),
    multer,
    postCtrl.updatePost
);

// Supprimer une post
router.delete(
    "/:id/deletePost",
    auth,
    verifyRoles(ROLES_LIST.User),
    postCtrl.deletePost
);

// Système de likes/dislikes
router.post(
    "/:id/like",
    auth,
    verifyRoles(ROLES_LIST.User),
    postCtrl.voteForPost
);

module.exports = router;
