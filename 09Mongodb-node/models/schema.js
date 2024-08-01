const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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

const user = mongoose.model('user', userSchema);


module.exports = user;