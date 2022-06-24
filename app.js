const express = require("express")
const app = express()
/* host and port */
const hostname = "localhost"
const port = 3000

app.get("/", (req,res) => {
    res.send("hello world | site is open")
})

// about page
app.get("/about", (req,res) => {
    res.send("about page")
})

// contact page
app.get("/contact", (req,res) => {
    res.send("contact page")
})

app.listen(port, ()=>{
    console.log(`server is online: http://${hostname}:${port}`)
})
