const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");
const ejs = require("ejs");
const hostname = "localhost";
const port = 3000;
const Photo = require("./models/Photo");
/* DATABASE CONNECTION */
mongoose.connect("mongodb://localhost/pcat-blog");

/* TEMPLATE ENGINE : EJS */

app.set("view engine", "ejs"); // ejs'yi template engine olarak kullanacağımızı belirttik. (set() metodu ile)
/* ejs, views klasörü içerisine bakar! */

// MIDDLEWARES

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

/* ROUTES */

// index page
app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"))

  const photos = await Photo.find({});

  res.render("index", { photos: photos });
});

// about page
app.get("/about", (req, res) => {
  res.render("about");
});

// add page
app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/page", (req, res) => {
  res.render("page");
});

// Uploaded Photo

app.post("/save", async (req, res) => {
  // post create işlemi gerçekleşene kadar yönlendirme olmayacak! (async-await fonk)
  if(!req.files){
    console.error("Dosya bulunamadi");
    return
  }

  console.log(req.files.image);

  // await Photo.create(req.body)
  // res.redirect("/") // işlemlerin bittikten sonra index sayfasına git
});

app.get("/photos/:id", async (req, res) => {
  // res.render("page");
  // console.log(req.params.id); ->> ilgili id'yi bu şekilde yakaladık

  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
});

app.listen(port, () => {
  console.log(`server is online: http://${hostname}:${port}`);
});
