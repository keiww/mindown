const mongoose = require('mongoose')
require('./models')

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  mongoose.connect('mongodb://localhost/test')
} else {
  mongoose.connect('mongodb://localhost/mindown')
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('db is connected')
})

