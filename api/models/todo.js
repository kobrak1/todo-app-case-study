const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        minLength: 1,
        maxLength: [4000, 'Too many characters, max length is 4000'],
        required: true
    },
    tags: [ String ],
    image: {
        data: Buffer,
        contentType: String
    },
    file: {
        data: Buffer,
        contentType: String
    },
    completed: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
})

todoSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo