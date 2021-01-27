//const config = require('./config')

const mongoose = require('mongoose')
//const dbPassword = config.dbPass

if (process.argv.length < 3) {
  console.log('Please provide minimum params, the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://dbname:${password}@cluster0.ifk6t.mongodb.net/phone_app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const PersonSchema = new mongoose.Schema({
  name:String,
  number:String
})


const People = mongoose.model('People', PersonSchema)

if(process.argv.length < 4){
    People.find({}).then((person) => {
        person.forEach(persons => {
            console.log(persons)
        })
        mongoose.connection.close()
    })
    .catch((err) => console.log("err", err))
    .finally(() => process.exit(1));
}else{
    const note = new People({
        name:process.argv[3],
        number:process.argv[4]
      })
      
      note.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
      })
}

