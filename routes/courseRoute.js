const express = require("express");

const courseController = require("../controllers/coursecontroller");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.route("/").post(roleMiddleware(["teacher","admin"]),courseController.createCourse); // http://localhost:3000/courses demek aslında

//ornek
//router.route("/yeni").post(courseController.yeniKurs); http://localhost:3000/courses/yeni olurdu.

router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse);


module.exports = router;