const { log } = require('node:console');
const fs= require('node:fs')
const sum = require('./module.mjs')
 const a=fs.readFileSync('text.txt', 'utf-8',(err, data)=>{
    console.log(err, data);
})
console.log(a);

fs.writeFileSync('text.txt','This is new content writen by write File function',()=>{
    console.log('writing file...');
})

fs.readFile('text.txt','utf-8',(err, data)=>{
    console.log(err, data);
})
console.log(a); 
console.log('Reading code finish'); 


sum(1,1)