const lineReader = require('line-reader');
const path = require('path');
Promise = require('bluebird');
const _ = require('lodash');
const eachLine = Promise.promisify(lineReader.eachLine);
const fs = require('fs');

function read_fragment(init, last) {
    let metrics = [];
    let response;
    let dir = __dirname + path.sep +'file1.tsv';
    try {
        let fd = fs.openSync(dir, 'r');
        let stats = fs.fstatSync(fd);

        let sockets = stats.size/10000;
        let bufferSize= /*(sockets-200)*/5*1024,
            chunkSize=1024,
            buffer=new Buffer.alloc(bufferSize),
            bytesRead = init;

        while (bytesRead < bufferSize) {
            if ((bytesRead + chunkSize) > bufferSize) {
                chunkSize = (bufferSize - bytesRead);
            }
            fs.read(fd, buffer, bytesRead, chunkSize, bytesRead);
            bytesRead += chunkSize;
        }
        //console.log(buffer.toString('utf8', 0, bufferSize));
        fs.closeSync(fd);
        return buffer;
    }catch (e) {
        console.log(e.message)
    }
}

let buffer1 = read_fragment(0,0);
let buffer2 = read_fragment(5120,0);


let bufferTotalLength = buffer1.length + buffer2.length;
let totalBuffer = Buffer.concat( [buffer1,buffer2], bufferTotalLength);
console.log(totalBuffer.toString('utf8', 0, totalBuffer.length));
/*
module.exports = {
    get_metrics
}

*/
