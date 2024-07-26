var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

console.log("Attempting to connect to MongoDB...");

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error("Failed to connect to the MongoDB server. Error:", err);
    return;
  }
  console.log("Connected to the MongoDB server!");
  
  var db = client.db("learnDbs");
  
  // Example operation
  db.collection('user').find({}).toArray(function(err, result) {
    if (err) {
      console.error("Error fetching data from 'test' collection:", err);
    } else {
      console.log("Data from 'test' collection:", result);
    }
    
    client.close(); // Close the connection when done
  });
});

