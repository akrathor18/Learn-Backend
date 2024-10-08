const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/about', (req, res) => {
  res.send('Hello World! about ')
})

app.get('/name/:name',(req,res )=>{
  res.send('name is '+req.params.name)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})