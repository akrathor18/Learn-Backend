// const { log } = require('node:console');
const fs= require('node:fs')

 const a=fs.readFileSync('text.txt', 'utf-8',(err, data)=>{
    console.log(err, data);
})
console.log(a);

fs.writeFileSync('text.txt','This is new content writen by write File function',()=>{
    console.log('writing file...');
})
console.log(a);
console.log('Reading code finish'); 