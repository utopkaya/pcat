const express = require("express")
const app = express()
/* host and port */
const hostname = "localhost"
const port = 3000


const myLogger = (req,res,next) => {
    console.log("Middleware Log 1");
    next()
}

// MIDDLEWARES 
/* middleware'ler sırayla çalışırlar. Middleware use ile kullanılır ve next() metodunu
kullanmazsak bir sonrakine geçemez */
app.use(express.static("public"))
app.use(myLogger)

app.get("/", (req,res) => {
    res.send("hello world | site is open")
})

// about page
app.get("/about", (req,res) => {
    res.send("about page")
})

// contact page
app.get("/contact", (req,res) => {
    res.send("contact page değişiklik")
})

app.listen(port, ()=>{
    console.log(`server is online: http://${hostname}:${port}`)
})
 