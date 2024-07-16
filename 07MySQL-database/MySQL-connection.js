const mysql = require('mysql');
require('dotenv').config();

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/connect:/value', (req, res) => {
    res.send('Hello World!')
    const value= req.params.value
    con.connect(function (err) {
        if (err) throw err;
        con.query(`SELECT * FROM city where name='${value}'`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            console.log(result.Name);
        });
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

var con = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASS,
    database: "world"
});

