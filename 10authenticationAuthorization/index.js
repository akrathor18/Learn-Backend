const express = require('express')
const app = express()
const port = 3000
const user = require('./module/userShema')
const database = require('./database')
var bodyParser = require('body-parser')

// const passport = require('passport')
const localStrategy= require('passport-local')

app.use(bodyParser.json())
// app.use(new localStrategy, async (username, password) => {
//     try {
        
//     } catch (error) {
//         console.log(error);
        
//     }
// })
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/post', async (req, res) => {
    try {
        const userData = req.body
        const newUser = new user(userData)
        const response = await newUser.save()
        console.log(response);
        res.status(201).json('User created secussefully!')

    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error')

    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})