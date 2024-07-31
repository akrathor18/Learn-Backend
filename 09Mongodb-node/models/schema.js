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

    // date: {
    //     type: date,
    //     default: Date.now,
    // }
})

const posts = mongoose.model('posts', postSchema);


module.exports = posts;