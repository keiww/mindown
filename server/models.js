const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  slug: String,
  timstamp: Date,
  text: String
})

mongoose.model('Page', schema)

