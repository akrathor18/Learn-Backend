const express = require('express')
const app = express()
const port = 3000

const database = require('./database')
var bodyParser = require('body-parser')

const passport = require('passport')
const localStrategy= require('passport-local')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})