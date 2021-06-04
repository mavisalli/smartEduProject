const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      //henuz course template'i olusmadıgı icin json'a yazdırıyoruz.
      status: "success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      //400 bad request hatasıdır genellikle syntax hatasından olur.
      status: "fail", //illa status olmasına gerek anlamlı bi mesaj olsun yeter. message: da yapabilirdik
      error,
    });
  }
};

//try catch blogu hatayı yakalamak icin

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).render("courses", {
      courses,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    res.status(200).render("course", {
      course,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
