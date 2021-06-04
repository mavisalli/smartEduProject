const express = require("express");

const courseController = require("../controllers/coursecontroller");

const router = express.Router();

router.route("/").post(courseController.createCourse); // http://localhost:3000/courses demek aslında

//ornek
//router.route("/yeni").post(courseController.yeniKurs); http://localhost:3000/courses/yeni olurdu.

router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);


module.exports = router;