const express = require('express')
const routes = express.Router()
const path= require('path')

routes.get('/', (req, res) => {
    // res.send('hii')
    res.sendFile(path.join(__dirname,'../templates/index.html'))
})

module.exports = routes