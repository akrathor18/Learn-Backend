var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";

console.log("Attempting to connect to MongoDB...");

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Connected to the MongoDB server!");
    client.close();
  }
});
