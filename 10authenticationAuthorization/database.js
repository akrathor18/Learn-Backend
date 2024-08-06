const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/Auth'
mongoose.connect(url)

const db= mongoose.connection;
db.on('connected',async () => {
    console.log('Connected successfully!');
    
})
db.on('error',async (error) => {
    console.log("An error occure", error);
    
})
db.on('disconnected',async () => {
    console.log('Database disConnected!');
    
})

module.exports= db;