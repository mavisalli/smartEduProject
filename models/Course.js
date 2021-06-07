const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }
})

CourseSchema.pre("validate", function(next){  //arrow func yapmadık cünkü this özelligi yok onda.
    this.slug = slugify(this.name, {
        lower: true,  // stringi kücük harfe cevirir
        strict: true  //özel karakterleri keser
    })
    next();
})

const Course = mongoose.model("Course", CourseSchema); // modele cevirme islemi

module.exports = Course;