const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const port = 3000;

// Create the MySQL connection once
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ashish',
    database: 'userLogin'
});

// Connect to the MySQL database
con.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/', (req, res) => {
    // const sql = "INSERT INTO details (Name, Email, Password) VALUES ('Ashish', 'A@gmail.com', 'ashish@123')";
    // con.query(sql, function (err, result) {
        // if (err) {
        //     console.error('Error executing query:', err);
        //     res.status(500).send('Error executing query');
        //     return;
        // }
        // console.log("1 record inserted");
        // res.send('Hello World! 1 record inserted');
    // });


});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
