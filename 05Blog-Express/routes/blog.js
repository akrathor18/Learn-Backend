const express = require('express')
const routes = express.Router()
const path= require('path')
const blogs= require('../data/blogs')

routes.get('/blogs', (req, res) => {
    // res.send(blogs)
    blogs.forEach(e=> {
        console.log(e.title);
    });
    // res.sendFile(path.join(__dirname,'../views/index.html'))
    res.render('../views/home')
})
routes.get('/', (req, res) => {
    res.send('Hiii')
    
    res.sendFile(path.join(__dirname,'../views/index.html'))
})
routes.get('/blogpost/:slug', (req, res) => {
    myblog= blogs.filter((e)=>{
      return  e.slug== req.params.slug
    })
    console.log(myblog);
    res.sendFile(path.join(__dirname,'../views/blogpage.html'))
})

module.exports = routes