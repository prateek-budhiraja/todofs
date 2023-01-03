const express = require("express");
const { home, login } = require("../controllers/auth.controller");
const router = express.Router();

router.get("/", home);
router.get("/login", login);

module.exports = router;
