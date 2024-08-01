const express = require('express')
const app = express()
const port = 3000
const database = require('./database')
const posts = require('./models/schema')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/posts', async (req, res) => {
  try {

    const data = req.body;
    const newPost = new posts(data)
    const response = await newPost.save()
    console.log(newPost);
    res.status(201).json('Data save sucessfully'+response)

  } catch (err) {
    console.log(err);
    res.status(500).json('Internal server error')
  }


});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})