const express = require("express");
const { home, login, signup } = require("../controllers/auth.controller");
const router = express.Router();

router.get("/", home);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
