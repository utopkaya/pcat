const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs")
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

  const photos = await Photo.find({}).sort("-dataCreated");

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
    console.log("dosya bulunamadı!");
  }

  // Create data!
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Image Upload Process - Resim Yukleme Islemi
  let uploadedImage = req.files.image; // gorsele ait tum bilgiler
  let uploadPath = __dirname + "/public/uploads/" + uploadedImage.name; // gorselin yuklenecegi server'daki dosya yolu
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      photoUrl: "/uploads/" + uploadedImage.name,
    });
  });

  res.redirect("/");

});

app.get("/photos/:id", async (req, res) => {
  // res.render("page");
  // console.log(req.params.id); ->> ilgili id'yi bu şekilde yakaladık

  const photo = await Photo.findById(req.params.id)

  res.render("photo", {photo})

});

// EDIT-UPDATE PHOTO

app.get("/edit", (req,res) => {
  res.render("edit")
})

app.get("/edit/:id", async (req, res)=>{
  const editPhoto = await Photo.findById(req.params.id)
  console.log(editPhoto);
  res.render("edit", {editPhoto})
})

// UPDATE BUTTON

app.post("/update", (req,res) => {
  console.log("Bilgiler bu ekranda güncellenecek!");
})

app.listen(port, () => {
  console.log(`server is online: http://${hostname}:${port}`);
});
