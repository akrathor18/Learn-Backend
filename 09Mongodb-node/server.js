const express = require('express')
const app = express()
const port = 3000
const database = require('./database')
const user = require('./models/schema')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/posts', async (req, res) => {
  try {

    const data = req.body;
    const newPost = new user(data)
    const response = await newPost.save()
    console.log(newPost);
    res.status(201).json('Data save sucessfully' + response)

  } catch (err) {
    console.log(err);
    res.status(500).json('Internal server error')
  }
});

app.get('/posts', async (req, res) => {
  try {
    const data = await user.find(); 
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})