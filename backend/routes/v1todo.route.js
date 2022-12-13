const express = require("express");
const router = express.Router();

// import controllers
const { home } = require("../controllers/v1todo.controller");

router.get("/", home);

module.exports = router;
