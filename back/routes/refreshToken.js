const express = require("express");
const router = express.Router();
const tokenCtrl = require("../controllers/refreshToken");

router.get("/", tokenCtrl.refreshToken);

module.exports = router;
