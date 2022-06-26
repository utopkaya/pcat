const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// database connection
mongoose.connect("mongodb://localhost/my-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Schema created
const UserSchema = new Schema({
    name: String,
    username: String,
    mail: String,
    password: String
})

// Model created
const User = mongoose.model("User", UserSchema)

// User created
User.create({
    name: "Serhat Akdoğan",
    username: "serhatakdogan",
    mail: "serhatakdgn@gmail.com",
    password: "123345Serhat."
})
