    const loginRouter = require('express').Router()
    const User = require('../../models/user')
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')

    loginRouter.post('/', async (req, res) => {
        const { email, password } = req.body
        console.log('HEYYYYY')
        const user = await User.findOne({ email })
        const isPasswordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)
        
        // Check if user exists and if password is correct
        if(!(user &&  isPasswordCorrect)) {
            return res.status(401).json({error: 'invalid email or password'})
        }

        // Generate JWT token
        const userForToken = {
            email: email,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET_KEY, { expiresIn: 60*60 })  // token expires in an hour

        // Respond with token and user information
        res.status(200).json({ 
            token, 
            email: user.email, 
            name: user.name
        })
    })

    module.exports = loginRouter