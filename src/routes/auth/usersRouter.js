const express = require("express");
const { userController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.post("/current", authMiddleware, userController.current);
router.patch("/", authMiddleware, userController.subscription);
router.patch("/avatars", authMiddleware, userController.avatars);

module.exports = router;
