const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// database connection
mongoose.connect("mongodb://localhost/my-database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema created
const UserSchema = new Schema({
  name: String,
  username: String,
  mail: String,
  password: String,
});

// Model created
const User = mongoose.model("User", UserSchema);

// User created
/* User.create({
    name: "Serhat Akdoğan",
    username: "serhatakdogan",
    mail: "serhatakdgn@gmail.com",
    password: "123345Serhat."
}) */

// read data
/* User.find({}, (err, data) => {
    if(!err) console.log(data);
})
 */

// user 2 created
/*User.create({
    name: "Yusuf İslam Çiftci", 
    username: "yusufislam",
    mail: "yusufislam@gmail.com",
    password: "islamdilan123."
})*/

const userId = "62b85552fb9ade25bea3aee7"; // serhat'ın id'si
// update user

/* User.findByIdAndUpdate(
    userId,
    {name: "Serhat AKDOĞAN"},
    {new: true}, // update edildikten sonra aşağıda update edilen datanın anında gözümkesi için burası şart!
    (err, data) => {
        if(!err) console.log(data);
    }
) */

// delete data
User.findByIdAndDelete(userId, (err, data) => {
    console.log(userId+ " id'sine sahip kayıt silindi [!]");
})
