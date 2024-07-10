const logger = require('./logger')
const jwt = require('jsonwebtoken')
const Todo = require('../models/todo')
const User = require('../models/user')
const { body } = require('express-validator')

const reqLogger = (req, res, next) =>{
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('Body:', req.body)
    logger.info('-----')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).end()
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(404).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    } else if ( error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return res.status(400).json({ error: 'expected username to be unique' })
    } else if ( error.name === 'JsonWebTokenError' ) {
      return res.status(400).json({ error: 'token missing or invalid' })
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'token expired' })
    }
  
    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
  
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      const token = authorization.substring(7)

      // decode the token got from req.body and assign it as 'req.token'
      req.token = jwt.verify(token, process.env.SECRET_KEY)
  
      if (!req.token.id) {
        return res.statusU(404).json({ error: 'token missing or invalid' })
      }
  
      next()
    } else next()
}

const userExtractor = async (req, res, next) => {
    req.user = await User.findById(req.token.id)
  
    next()
}

const todoExtractor = async (req, res, next) => {
    req.todo = await Todo.findById(req.params.id)

    next()
}

const validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

module.exports = {
    reqLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
    todoExtractor,
    validateUser,
}