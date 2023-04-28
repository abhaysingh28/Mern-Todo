const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema);