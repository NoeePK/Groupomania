const express = require("express");
const router = express.Router();
const logoutCtrl = require("../controllers/logout");

router.get("/", logoutCtrl);

module.exports = router;
