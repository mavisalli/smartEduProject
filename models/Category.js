const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true
    }
})

CategorySchema.pre("validate", function(next){  //arrow func yapmadık cünkü this özelligi yok onda.
    this.slug = slugify(this.name, {
        lower: true,  // stringi kücük harfe cevirir
        strict: true  //özel karakterleri keser
    })
    next();
})

const Category = mongoose.model("Category", CategorySchema); // modele cevirme islemi

module.exports = Category;