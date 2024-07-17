const mysql = require('mysql');
require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust this based on your application's needs
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASS,
    database: "world"
});

app.get('/', (req, res) => {
    pool.query(`SELECT * FROM city `, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.json(results);
});
});
app.get('/connect/:value', (req, res) => {
    const value = req.params.value;
    pool.query(`SELECT * FROM city WHERE name = ?`, [value], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
