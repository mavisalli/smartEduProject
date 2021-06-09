const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID //artık bi kurs olusturdugumuzda user bilgisine de sahip olucaz.
    });
    
    req.flash("success", `${course.name} has been created successfully`);
    res.status(201).redirect("/courses");
  } catch (error) {
    req.flash("error", "Something happened!");
    res.status(400).redirect("/courses");
  }

};

//try catch blogu hatayı yakalamak icin

exports.getAllCourses = async (req, res) => {
  try {

    const categorySlug = req.query.categories; 
    const query = req.query.search; 
    const category = await Category.findOne({slug: categorySlug});  // parametreden gelen category ismini buluyoruz.

    let filter = {}; //ileride search bölümünden de category quwry'si olusturcagımız icin bos bir filter olusturduk.

    if(categorySlug) {
      filter = {category: category._id} //mesela category._id si web design'ın objectId sine esit olanları filtrele.
    }

    if(query) {
      filter = {name: query}
    }

    if(!query && !categorySlug) {
      filter.name = "",
      filter.category = null
    }

    const courses = await Course.find({
      $or:[ // ikisinden birine göre sec
        {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}}, // $options: "i" kücük büyük harfe duyarsız yapar
        {category: filter.category}
      ]
    }).sort("-createdAt").populate("user"); // sort sayesinde En son yüklenenin basta gözükmesini saglar

    const categories = await Category.find();

    res.status(200).render("courses", {
      courses,
      categories,
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
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate("user"); //course'ın icindeki user'dan faydalanıp tekil course sayfasında user'a ulasıyoruz. populate sayesinde
    const categories = await Category.find();

    res.status(200).render("course", {
      course,
      page_name: "courses",
      user,
      categories
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {

    const user = await User.findById(req.session.userID);
    await user.courses.push({_id:req.body.course_id});
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


exports.releaseCourse = async (req, res) => {
  try {

    const user = await User.findById(req.session.userID);
    await user.courses.pull({_id:req.body.course_id});
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {

    const course = await Course.findOneAndRemove({slug: req.params.slug})
    req.flash("error", `${course.name} has been deleted successfully`);

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {

    const course = await Course.findOne({slug: req.params.slug})
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};