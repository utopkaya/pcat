const express = require("express");
const app = express();
const ejs = require("ejs");
const hostname = "localhost";
const port = 3000;
const path = require("path");

/* TEMPLATE ENGINE : EJS */

app.set("view engine", "ejs"); // ejs'yi template engine olarak kullanacağımızı belirttik. (set() metodu ile)
/* ejs, views klasörü içerisine bakar! */

// MIDDLEWARES

/* middleware'ler sırayla çalışırlar. Middleware use ile kullanılır ve next() metodunu
kullanmazsak bir sonrakine geçemez diye not düşülsün */
app.use(express.static("public"));

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

app.listen(port, () => {
  console.log(`server is online: http://${hostname}:${port}`);
});
