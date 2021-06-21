const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo'); //sunucu kapansa da session bilgilerini tutmaya yarar.
const flash = require('connect-flash');
const methodOverride = require("method-override");

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");


const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/smartedu-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=> {
  console.log("DB Connected Successfully")
});

// Template Engine
app.set("view engine", "ejs");

// Global variables

global.userIN = null;  //if ifadesindeki false degerine karsılık gelir.

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({  //session middleware
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }) //sunucu kapansa da session bilgilerini tutmaya yarar.
}))
app.use(flash()); //connect-flash'ın middleware'ı
app.use((req,res,next)=> {
  res.locals.flashMessages = req.flash(); //flash'ta olusturdugum mesajları localde flashmessage degiskenine atıyoruz. bu degiskeni olusturmamın sebebi ilgili templatelerde flash messagelarını olusturabilmek.
  next();
})
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

// Routes
app.use("*", (req,res,next)=> { //diger middleware'lere gecmesi icin next kullandık. diger middlewarelerde kulanmamamızın nedeni ise res.redirect, res.send gibi bi sekilde sonlanıyorlar kendi iclerinde.
  userIN = req.session.userID; // artık true oldu.
  next();
})
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);



const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
