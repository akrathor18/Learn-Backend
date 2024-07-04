const http = require('http')

const port = 8000

const server=http.createServer((req, res)=>{
    console.log(res);
    res.statusCode=200;
    res.setHeader('content-type', 'text/html')
    res.end(`<h1>Hello this is my first server </h1>${res.url}`)
})

server.listen(port, ()=>{
    console.log(`server is listen on port${port}`);
})