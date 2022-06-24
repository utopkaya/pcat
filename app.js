const express = require("express")
const app = express()
const hostname = "localhost"
const port = 3000
const path = require("path")

// MIDDLEWARES 
/* middleware'ler sırayla çalışırlar. Middleware use ile kullanılır ve next() metodunu
kullanmazsak bir sonrakine geçemez */
app.use(express.static("public"))

app.get("/", (req,res) => {
    res.sendFile(path.resolve(__dirname, "temp/index.html"))
})

// about page
app.get("/about", (req,res) => {
    res.sendFile(path.resolve(__dirname, "temp/about.html"))
})

// contact page
app.get("/contact", (req,res) => {
    res.send("contact page değişiklik")
})

app.listen(port, ()=>{
    console.log(`server is online: http://${hostname}:${port}`)
})
 