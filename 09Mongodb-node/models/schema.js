const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    category: String,
    likes: Number,

    date: {
        type: String,
        default: Date.now,
    }
})

const post = mongoose.model('post', postSchema);


module.exports = post;