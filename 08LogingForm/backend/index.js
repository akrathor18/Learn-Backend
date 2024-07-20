const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const port = 3000;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const util = require('util');
require('dotenv').config();

var bodyParser = require('body-parser');

const con = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
app.use(bodyParser.json())


con.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

const query = util.promisify(con.query).bind(con);
app.use(cors())

app.post('/', async (req, res) => {
    const { fName, Email, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const checkMail = `SELECT Email FROM details WHERE Email = ?`;
    const sql = "INSERT INTO details (Name, Email, Password) VALUES (?, ?, ?)";



    con.query(checkMail, [Email], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.length > 0) {
            res.status(409).json({
                "status": 409,
                "msg": "Email already exists."
            });
        } else {
            con.query(sql, [fName, Email, hashedPassword], (err, result) => {
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



app.post('/sign-in', async (req, res) => {

    const { Email, Password } = req.body;
    const sql = `SELECT * FROM details WHERE Email = ?`;


    try {
        const result = await query(sql, [Email]);
        if (result.length === 0) {
            return res.status(404).json({ msg: 'User not found', status: 404 });
        }

        const user = result[0];
        const match = await bcrypt.compare(Password, user.Password);

        if (!match) {
            return res.status(401).json({ msg: "Password is incorrect", status: 401 });
        }

        res.status(200).json({ msg: "Login successfully", status: 200 });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});