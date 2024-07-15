const todosRouter = require('express').Router()
const Todo = require('../models/todo')
const User = require('../models/user')
const logger = require('../utils/logger')
const { userExtractor, todoExtractor, tokenExtractor } = require('../utils/middleware')

// GET all todos for the authenticated user
todosRouter.get("/", userExtractor, async (req, res, next) => {
    try {
      const userId = req.user._id
      const todos = await Todo.find({ user_id: userId }).populate('user_id', { name: 1, email: 1 })
      res.status(200).json(todos)
    } catch (exception) {
      next(exception)
    }
  })

// GET a todo with specified id
todosRouter.get('/:id', todoExtractor, async (req, res, next) => {
    const userId = req.user.id; // extract user ID from authenticated user

    try {
        const todo = await Todo.findById(req.todo.id).populate('user_id', { name: 1, email: 1 })
        const todoUserId = todo.user_id._id.toHexString() // assigned user id to the todo
        
        if (!todo) {
            return res.status(404).json({ error: 'There is no todo with the specified id' })
        }

        // Ensure the user can only access their own todos
        if (todoUserId !== userId) {
            return res.status(403).json({ error: 'You are not authorized to access this todo' })
        }

        res.status(200).json(todo)
    } catch (error) {
        console.error('Error while getting the todo info:', error.message)
        res.status(500).json({ error: 'Error while getting the todo info' })

        next(error)
    }
});

// post a new todo
todosRouter.post('/', userExtractor, async (req, res, next) => {
    const body = req.body
    const user = req.user // variable from userExtractor

    try {
        // check if content missing
        if(!body.text) {
            return res.status(400).json({error: 'text missing'})
        }
    
        const todo = new Todo({
            user_id: user._id,
            tags: body.tags,
            text: body.text,
            image: body.image,
            file: body.file,
            updated_at: new Date(),
            created_at: new Date(),
        })

        const savedTodo = await todo.save()

        user.todos = user.todos.concat(savedTodo._id)
        await user.save()

        res.status(201).json(savedTodo)
    } catch (error) {
        next(error)
    }
})

// delete a specific todo
todosRouter.delete('/:id', todoExtractor, async (req, res, next) => {
    try {        
        const authorId = req.todo.user_id.toString()
        const userId = req.token.id  // tokenExtractor function has already been imported to app.js
    
        if(authorId === userId) {
            await Todo.findByIdAndDelete(req.params.id)
            return res.status(204).end()
        }
        
        res.status(403).send({ error: "You are not allowed to delete someone else's todo" })
    } catch (error) {
        next(error)
    }
})

// update a specific blog
todosRouter.put('/:id', async (req, res, next) => {
    const {  tags, text, image, file } = req.body
        const updatedTodo = await Blog.findByIdAndUpdate(
            req.params.id,
            { tags, text, image, file },
            { new: true, runValidators: true, context: 'query' }
        )

        // respond with the updated note as JSON
        res.status(200).json(updatedTodo)
    try {
        
    } catch (error) {
        next(error)
    }
})

module.exports = todosRouter
