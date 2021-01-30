const mongoose = require('mongoose')
const config = require('../config')
const url = config.MongoDB_URI
const uniqueValidator = require('mongoose-unique-validator')
mongoose.connect(process.env.MongoDB_URI || url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  // eslint-disable-next-line no-unused-vars
  .then(_result => {    console.log('connected to MongoDB')  })  .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  })

const PersonSchema = new mongoose.Schema({
  name:{ type: String, required: true, unique: true, minlength: 3 },
  number:{ type: String, required: true, minlength: 8 }
})
PersonSchema.plugin(uniqueValidator)

PersonSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('People',PersonSchema)