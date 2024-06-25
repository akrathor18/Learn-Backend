import express from 'express'

const app= express()
const port =3000;
app.get('/',(req,res)=>{
    res.send('hello worold')
})
app.get('/user',(req,res)=>{
    res.send('hello worold ')
})
app.get('/h',(req,res)=>{
    res.send('hello worold h')
})

app.listen(port,()=>{
    console.log(`Server listen at port ${port}...`);
})
