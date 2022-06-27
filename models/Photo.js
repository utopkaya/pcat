const mongoose = require("mongoose")

// Schema
const Schema = mongoose.Schema

const PhotoModel = new Schema({
    title: String,
    description: String,
    photoUrl: String,
    dataCreated: {
        type: Date,
        default: Date.now()
    }
})

// Model

const Photo = mongoose.model("Photo", PhotoModel)

module.exports = Photo