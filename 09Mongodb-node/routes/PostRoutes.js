const express = require('express')
const route = express.Router()
const post = require('./../models/UserShema')



route.post('/', async (req, res) => {
    try {

        const data = req.body;
        const newPost = new post(data)
        const response = await newPost.save()
        console.log(newPost);
        res.status(201).json('Data save sucessfully' + response)

    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error')
    }
});

route.get('/', async (req, res) => {
    try {
        const data = await post.find();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
});

module.exports = route;
