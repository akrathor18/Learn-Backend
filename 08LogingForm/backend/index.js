const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ashish',
    database: 'userLogin'
  })
  
app.get('/', (req, res) => {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      })
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})