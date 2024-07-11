const express = require('express')
const path= require('path')
const app = express()
const port = 3000


const { engine } = require('express-handlebars');

app.engine('handlebars', engine({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.static(path.join(__dirname,'static')))

app.use('/', require(path.join(__dirname,'routes/blog')))

app.listen(port, () => {
  console.log(`Blog app listening on port http://localhost:${port}`)
})