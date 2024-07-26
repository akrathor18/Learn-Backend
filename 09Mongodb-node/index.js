var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error("Failed to connect to the MongoDB server. Error:", err);
    return;
  }
  console.log("Connected to the MongoDB server!");
  
  var db = client.db("learnDbs");
  
  // Database operations can be performed here
  
  client.close(); // Close the connection when done
});

