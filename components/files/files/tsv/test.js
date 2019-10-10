const fs = require('fs');
const path = require('path');

// load a few hundred thousand words into an array
let dir = __dirname + path.sep +'file1.tsv';
let a_words = fs.readFileSync(dir, 'utf8').split('\n');
console.log(a_words);