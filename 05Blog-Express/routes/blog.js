const express = require('express')
const routes = express.Router()
const path= require('path')
const bolgs= require('../data/blogs')

routes.get('/', (req, res) => {
    res.send(bolgs)
    
    res.sendFile(path.join(__dirname,'../templates/index.html'))
})

module.exports = routes