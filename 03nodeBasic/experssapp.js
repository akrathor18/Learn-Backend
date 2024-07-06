const express = require('express');
const app=  express();
const port =8000;

app.get('/',(req, res)=>{
    res.send(('hello world'))
})

app.get('/about',(req, res)=>{
    res.send('this is about page')
})
app.get('*',(req, res)=>{
    res.send('this is page not found 404')
})

app.listen(port,()=>{
    console.log(`server running port ${port}`);
})
 
