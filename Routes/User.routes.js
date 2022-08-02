const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/User.controller");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
// router.post("/refresh-token", AuthController.refreshToken);
// router.delete("/logout", AuthController.logout);

module.exports = router;
