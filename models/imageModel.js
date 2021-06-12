const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
  label: String,
  photoUrl: String,
})

const Photo = mongoose.model('Photo', PhotoSchema)
module.exports = Photo
