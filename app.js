const express = require("express");
const app = express();
const mongoose = require("mongoose")
const ejs = require("ejs");
const hostname = "localhost";
const port = 3000;
const path = require("path");
const Photo = require("./models/Photo")
/* DATABASE CONNECTION */
mongoose.connect("mongodb://localhost/pcat-blog")

/* TEMPLATE ENGINE : EJS */

app.set("view engine", "ejs"); // ejs'yi template engine olarak kullanacağımızı belirttik. (set() metodu ile)
/* ejs, views klasörü içerisine bakar! */

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())


/* ROUTES */

// index page
app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"))

  const photos = await Photo.find({})

  res.render("index", {photos:photos});

});

// about page
app.get("/about", (req, res) => {
  res.render("about");
});

// add page
app.get("/add", (req, res) => {
  res.render("add");
});

// Uploaded Photo
app.post("/photos", async (req,res) => { // post create işlemi gerçekleşene kadar yönlendirme olmayacak! (async-await fonk)
  await Photo.create(req.body)
  res.redirect("/") // işlemlerin bittikten sonra index sayfasına git
})

app.listen(port, () => {
  console.log(`server is online: http://${hostname}:${port}`);
});


