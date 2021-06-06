const express = require("express");

const authController = require("../controllers/authcontroller");

const router = express.Router();

router.route("/signup").post(authController.createUser); // http://localhost:3000/users/signup demek aslında

router.route("/login").post(authController.loginUser);

router.route("/logout").get(authController.logoutUser);


module.exports = router;