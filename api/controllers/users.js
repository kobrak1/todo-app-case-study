const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const { validateUser } = require('../utils/middleware')

// get all users
usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find({}).populate('todos', { text: 1, created_at: 1 })
        res.status(200).json(users)
    } catch (error) {
        console.error('Error caught while getting users')
        res.status(500).json({error: 'Error while getting users'})
    }
})

// get a specific user
usersRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).populate('todos', { content: 1, created_at: 1 })
        if(user === null) {
            return res.status(404).json({error: 'There is not a user with specified id'})
        }
    
        res.status(200).json(user)
    } catch (error) {
        console.error('Error caught while getting user info:', error)
        res.status(500).json({error: 'Error while getting user info'})
    }
})

// post a new user
usersRouter.post('/', validateUser, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // extracted values from the request body
    const { name, email, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        name,
        email,
        passwordHash,
        created_at: new Date(),
        updated_at: new Date()
    })

    try {
        const savedUser = await user.save()
        if(!savedUser) {
            return res.status(404).json({error: 'Error while posting the blog'})
        }

        res.status(201).json(savedUser)
    } catch (error) {
        console.error('Error caught while creating the user:', error.message)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = usersRouter