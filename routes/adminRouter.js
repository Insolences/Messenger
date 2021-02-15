const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");

//localhost:5000/api/v1/

router.get("/getUsers", controller.findUsers);
router.post("/updateUser", (...args) => controller.updateUsers(...args));
router.get("/getAllChats", controller.getAllChats);


module.exports = router;
