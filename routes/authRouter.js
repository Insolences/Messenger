const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("../passport/passportStrategy");

//localhost:5000/apiv1/

router.post("/auth", (...args) => controller.auth(...args));
router.post("/verify", controller.verify)
router.post("/access", controller.access)
router.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate(
    "google",
     { failureRedirect: "/failed" }
  ),
  controller.auth
);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/failed" }),
  controller.auth
);

router.get("/failed", (req,res)=>res.send(401,"Unauthorized"))

module.exports = router;
