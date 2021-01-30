const express = require('express')
const app = express()
const cors = require('cors')
//const config = require('./config')
//const mongoose = require('mongoose')
const person = require('./models/person')
app.use(express.json())
const morgan = require('morgan')
morgan.token('custom', (req) => {
  return 'POST' === req.method ? JSON.stringify(req.body) : ' '
})

app.use(cors())

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :custom'
  )
)

/* function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
} */


const People = person

app.get('/api/persons', (req, res) => {
  People.find({}).then((person) => res.json(person))
})

/* app.get('/info', (req, res) => {
  const response = `
    <p>Phonebook has ${notes.length} people</p>
    ${new Date()}
    `

  res.send(response)
}) */

app.get('/api/persons/:id', async (req, res,next) => {
  try {
    const person = await People.findById(req.params.id)
    if (!person) {
      return res.sendStatus(404)
    }
    res.json(person)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id',async (req, res,next) => {
  try{
    const person = await People.findById(req.params.id)
    if(!person){
      return res.status(404).json({
        error:'person does not exist!!'
      })
    }
    await People.findByIdAndRemove(req.params.id)
    res.json({ success: true })
  }catch(err){
    next(err)
  }
})

app.post('/api/persons',async (req, res,next) => {
  const { name, number } = req.body
  /* if (!name || !number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  } */

  //const item = await People.findOne({ name:name })
  /* if (item) {
    return res.status(400).json({
      error: "name already exists",
    });
  } */
  const person = {
    name,
    number,
  }
  const newPerson = await new People(person)
  try {
    await newPerson.save()
    res.json(newPerson)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const note = {
    name: body.name,
    number: body.number,
  }

  People.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if(error.name === 'DuplicateError'){
    return response.status(400).json({ error:'duplicate name' })
  }

  next(error)
}

app.use(errorHandler)
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
}


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on ${PORT}!!!`)
})
