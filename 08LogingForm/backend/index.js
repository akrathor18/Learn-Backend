const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
// Create the MySQL connection once
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ashish',
    database: 'userLogin'
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

    const sql = "INSERT INTO details (Name, Email, Password) VALUES (?, ?, ?)";
    
    con.query(sql, [fName, Email, Password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error'); // Ensure to return here
        }

        console.log("1 record inserted");
        res.send('Data received and inserted successfully!'); // Send response only once
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

        if (result.length === 0) {
            res.status(404).send({msg:'User not found'});
            return;
        }
        const user = result[0];

        if (user.Password){
            res.status(200).send({msg:"Login successfully"})

        }
        console.log(typeof( result));
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
