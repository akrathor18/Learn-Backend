const express = require('express')
const app = express()
const port = 3000
const database= require('./database')
const posts = require('./models/schema')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/posts', (req, res) => {

  const data= req.body;
  console.log(data);
  const newPost= new posts
  console.log(newPost);
  res.status(201).send('Data post sucessfully')

});('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})