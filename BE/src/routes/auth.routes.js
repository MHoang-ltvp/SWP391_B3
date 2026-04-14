const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/sign-in", authController.signIn);
router.post("/google", authController.signInWithGoogle);
router.get("/profile", authController.profile);

module.exports = router;
