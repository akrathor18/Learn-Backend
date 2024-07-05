const http = require('http');
const {fs} = require('fs'); 
const port = 8000;

const server = http.createServer((req, res) => {
    console.log(`Received request for URL: ${req.url}`);
    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/') {
        res.statusCode = 200;
        res.end(`<h1>Hello, this is my first server</h1><p>Requested URL: ${req.url}</p>`);
    } else if (req.url === '/ashish') {
        try {
            const data = fs.readFileSync('index.html');
            res.statusCode = 200;
            res.end(data.toString());
        } catch (err) {
            console.error('File read error:', err);
            res.statusCode = 500;
            res.end('<h1>Internal Server Error</h1>');
        }
    } else {
        res.statusCode = 404;
        res.end(`<h1>Page not found 404</h1><p>Requested URL: ${req.url}</p>`);
    }
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
