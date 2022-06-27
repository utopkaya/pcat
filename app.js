const express = require("express");
const app = express();
const mongoose = require("mongoose")
const ejs = require("ejs");
const hostname = "localhost";
const port = 3000;
const path = require("path");

/* DATABASE CONNECTION */
mongoose.connect("mongodb://localhost/pcat-blog")

/* CREATED SCHEMA */
const Schema = mongoose.Schema

/* TEMPLATE ENGINE : EJS */

app.set("view engine", "ejs"); // ejs'yi template engine olarak kullanacağımızı belirttik. (set() metodu ile)
/* ejs, views klasörü içerisine bakar! */

// MIDDLEWARES

/* middleware'ler sırayla çalışırlar. Middleware use ile kullanılır ve next() metodunu
kullanmazsak bir sonrakine geçemez diye not düşülsün */
app.use(express.static("public"));
// req.body undefined döndüğü için iki tane middleware aşağıdaki gibidir:
// url'deki datayı okumamızı sağlıyor
app.use(express.urlencoded({extended:true}))
// url'deki datayı json formatında veriyor
app.use(express.json())


/* ROUTES */
app.get("/", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"));
  res.render("index");
});

// about page
app.get("/about", (req, res) => {
  res.render("about");
});

// add page
app.get("/add", (req, res) => {
  res.render("add");
});

// ADD PHOTO

// photo schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
  photoUrl: String
})

// photo model
const Photo = mongoose.model("Photo", PhotoSchema)

// Uploaded Photo
app.post("/photos", (req,res) => {
  Photo.create({
    title: req.body.title,
    description: req.body.description,
    photoUrl: req.body.image
  })
  res.redirect("/") // işlemlerin bittikten sonra index sayfasına git
})
app.listen(port, () => {
  console.log(`server is online: http://${hostname}:${port}`);
});


