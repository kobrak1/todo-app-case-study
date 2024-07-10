const registerRouter = require('express').Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const { validateUser } = require('../../utils/middleware')

registerRouter.post('/', validateUser, async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password, name } = req.body

        // check if the email is already in use
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'email already in use' })
        }

        // hash the password
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        // Create a new user
        const user = new User({
            email,
            name,
            passwordHash,
        })

        // save the new user to the database
        const savedUser = await user.save()

        // respond with success message
        res.status(201).json({
            email: savedUser.email,
            name: savedUser.name
        })
    }
)

module.exports = registerRouter
