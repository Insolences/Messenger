const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

//localhost:5000/api/v1/

router.post("/auth", (...args) => controller.auth(...args));


module.exports = router;
