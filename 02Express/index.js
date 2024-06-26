import express from 'express'

const app= express()
const port =3000;
app.use(express.json())

let data=[]
let nextId=1

app.post('/data',(req, res)=>{
    const{name, price}=req.body
    const newdata={id:nextId++, name, price}
    data.push(newdata)
    res.status(201).send(newdata)
})

app.get('/data', (req, res)=>{
    res.status(200).send(data)
})
app.get('/data/:id', (req, res)=>{
    const findata=  data.find(d=>id=== parseInt(req.params.id))
    if (!findata){
        return res.status(404).send('404 Data not found')
    }

    res.status(200).send(findata)
})

app.put('/data/:id', (req, res)=>{
    const findata=  data.find(d=>id=== parseInt(req.params.id))
    if (!findata){
        return res.status(404).send('404 Data not found')
    }
    const{name, price}=req.body
    findata.name=name
    findata.price=price
    req.send(200).send(findata)
})

app.get('/',(req,res)=>{
    res.send('hello worold')
})
app.get('/user',(req,res)=>{
    res.send('hello worold ')
})
app.listen(port,()=>{
    console.log(`Server listen at port ${port}...`);
})
