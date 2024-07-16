var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "world"
});


con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM city where name='chandigarh'", function (err, result, fields) {
        if (err) throw err;

        console.log(result);
        console.log(result.Name);
    });
});