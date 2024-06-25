const { log } = require('console')
const http = require('http')

const hostname='localhost'
const port =3000

const server= http.createServer((req, res)=>{
    res.statusCode=200
    res.setHeader('Conetent-text', 'text/plain')
    res.end('Hello Ashish')
})

server.listen(port, hostname,()=>{
    console.log(`server listening at http://${hostname}:${port}`);
})