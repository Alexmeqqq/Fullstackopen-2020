const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/index')
let mongoUrl = config.MONGODB_URI;
if (process.env.NODE_ENV === 'test') {  mongoUrl = config.TEST_URI}
mongoose.connect(mongoUrl, {
     useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true 
    })
    .then(result => {
            logger.info('connected to MongoDB')  
    })  
    .catch((error) => {    logger.error('error connecting to MongoDB:', error.message)  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/api/blogs',blogRouter)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)  
module.exports = app