const mongoose = require('mongoose')
require('./models')

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  mongoose.connect('mongodb://localhost/test')
} else {
  mongoose.connect('mongodb://localhost/mindown')
}

module.exports = mongoose.connection

