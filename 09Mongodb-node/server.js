const express = require('express')
const app = express()
const port = 3000
const database = require('./database')
var bodyParser = require('body-parser')
const userRoutes = require("./routes/UserRoutes")
const postRoutes = require("./routes/PostRoutes")
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/user', userRoutes)
app.use('/posts', postRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})