const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const port = 3000;
require('dotenv').config();

var bodyParser = require('body-parser');
const { default: postcss } = require('postcss');
// Create the MySQL connection once
const con = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
app.use(bodyParser.json())
// Connect to the MySQL database
con.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.use(cors())

app.post('/', (req, res) => {
    const { fName, Email, Password } = req.body;

    const checkMail = `SELECT Email FROM details WHERE Email = ?`;
    const sql = "INSERT INTO details (Name, Email, Password) VALUES (?, ?, ?)";

    con.query(checkMail, [Email], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.length > 0) {  // Check if any rows are returned
            res.status(409).json({
                "status": 409,
                "msg": "Email already exists."
            });
        } else {
            con.query(sql, [fName, Email, Password], (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log("1 record inserted");
                res.status(201).json({
                    "status": 201,
                    "msg": "Account create successfully!"
                })
            });
        }
    });
});




app.post('/sign-in', (req, res) => {
    const { Email, Password } = req.body;
    const sql = `SELECT * FROM details WHERE Email = ?`;

    con.query(sql, [Email], function (err, result) {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        const user = result[0];

        if (result.length === 0) {
            // return
            res.status(404).json({ msg: 'User not found', status: 404 });
        }

        if (user.Password != Password) {
            // return
            res.status(404).json({ msg: "Password is incorrect", status: 401 })
        }

        if (user.Password == Password) {
            // return
            res.status(200).json({ msg: "Login successfully", status: 200 })
        }
        console.log(result);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
