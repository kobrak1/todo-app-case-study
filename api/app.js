const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const usersRouter = require('./controllers/users')
const todosRouter = require('./controllers/todos')
const loginRouter = require('./controllers/auth/login')
const registerRouter = require('./controllers/auth/register')

// mongodb config and connection
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb')
  })
  .catch((error) => {
    console.log('Error connecting to mongodb:', error.message)
  })

// middlewares
app.use(cors())
app.use(express.json())
app.use(middleware.reqLogger)
app.use(middleware.tokenExtractor)

// routers
app.use('/api/users', usersRouter)
app.use('/api/todos', todosRouter)
app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app