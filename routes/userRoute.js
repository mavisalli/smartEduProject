const express = require("express");

const authController = require("../controllers/authcontroller");

const router = express.Router();

router.route("/signup").post(authController.createUser); // http://localhost:3000/users/signup demek aslında




module.exports = router;