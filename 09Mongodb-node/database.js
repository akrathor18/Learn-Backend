const mongoose = require('mongoose');

const url= 'mongodb://127.0.0.1:27017/learnDbs'

mongoose.connect(url)

const db= mongoose.connection;
db.on('connected',()=>{
    console.log("Database connected");
})
db.on('error',(err)=>{
    console.log('Failed to connecting with database', err);
})
db.on('disconnected',()=>{
    console.log("Database disconnected");
})

module.exports= db;