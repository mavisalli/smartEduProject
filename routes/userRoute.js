const express = require("express");

const authController = require("../controllers/authcontroller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/signup").post(authController.createUser); // http://localhost:3000/users/signup demek aslında

router.route("/login").post(authController.loginUser);

router.route("/logout").get(authController.logoutUser);

router.route("/dashboard").get(authMiddleware,authController.getDashboardPage);


module.exports = router;