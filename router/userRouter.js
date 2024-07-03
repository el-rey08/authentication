const express = require("express");

const router = express.Router();

const { validateSignUp } = require("../middleware/validation");

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/userController");

router.post("/users/sign-up", registerUser);

router.post("/users/sign-in", loginUser);

module.exports = router;
