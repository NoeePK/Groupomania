// const express = require("express");
// const router = express.Router();
// const commentCtrl = require("../controllers/comments");
// const auth = require("../middleware/auth");
// const slowDown = require("../middleware/speedLimiter");

// // Récupérer les commentaires
// router.get("/", auth, commentCtrl.getComments);

// // Ajouter un commentaire
// router.post("/createComment", auth, commentCtrl.createComments);

// // Modifier un commentaire
// router.put(
//     ":id/updateComment",
//     auth,
//     commentCtrl.updateComments
// );

// // Supprimer un commentaire
// router.delete(
//     ":id/deleteComment",
//     auth,
//     commentCtrl.deleteComment
// );


// module.exports = router;