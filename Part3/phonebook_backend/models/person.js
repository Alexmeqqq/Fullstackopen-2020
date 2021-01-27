const mongoose = require('mongoose')
const config = require('../config')
const url = config.MongoDB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {    console.log('connected to MongoDB')  })  .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  })

const PersonSchema = new mongoose.Schema({
    name:String,
    number:String
})

PersonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
module.exports = mongoose.model('People',PersonSchema)  