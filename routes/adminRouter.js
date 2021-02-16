const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");

//localhost:5000/api/v1/

router.get("/users", controller.findUsers);
router.patch("/users", (...args) => controller.updateUsers(...args));
router.get("/chats", controller.getAllChats);


module.exports = router;
