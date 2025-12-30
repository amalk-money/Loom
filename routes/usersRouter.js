const express = require("express");
const router = express.Router();

const {registerUser, loginuser, logoutuser} = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/register", registerUser)

router.post("/login", loginuser)

router.get("/logout", logoutuser)

module.exports = router;

