const express = require('express')
const routes = express.Router()
const path= require('path')
const blogs= require('../data/blogs')

routes.get('/blogs', (req, res) => {
    // res.send(bolgs)
    blogs.forEach(e=> {
        console.log(e.title);
    });
    res.sendFile(path.join(__dirname,'../templates/index.html'))
})
routes.get('/', (req, res) => {
    res.send('Hiii')
    
    res.sendFile(path.join(__dirname,'../templates/index.html'))
})
routes.get('/blogpost/:slug', (req, res) => {
    myblog= blogs.filter((e)=>{
      return  e.slug== req.params.slug
    })
    console.log(myblog);
    res.sendFile(path.join(__dirname,'../templates/blogpage.html'))
})

module.exports = routes