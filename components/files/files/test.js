const lineReader = require('line-reader');
const path = require('path');
Promise = require('bluebird');
const _ = require('lodash');
const eachLine = Promise.promisify(lineReader.eachLine);
const fs = require('fs');


let dir = __dirname + path.sep +'file1.tsv';
try {
    fs.open(dir, 'r', function(err, fd) {

        fs.fstat(fd, function(err, stats) {
            let sockets = stats.size;
            let bufferSize= sockets,
                chunkSize=1024,
                buffer=new Buffer.alloc(bufferSize),
                bytesRead = 0;

            while (bytesRead < bufferSize) {
                if ((bytesRead + chunkSize) > bufferSize) {
                    chunkSize = (bufferSize - bytesRead);
                }
                fs.read(fd, buffer, bytesRead, chunkSize, bytesRead);
                bytesRead += chunkSize;
            }
            console.log(buffer.toString('utf8', 0, bufferSize));
            fs.closeSync(fd);
            //return buffer;
        });
    });
        /*
        eachLine(dir, function (line) {
            let lineSplit = _.split(line, '\t');
            let user_id = lineSplit[0];
            let cod = lineSplit[2];
            //console.log(cod);
            let segments = _.split(lineSplit[1], ',');
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i];
                metrics[segment][cod] += 1;

            }
        }).then(function (err) {
            if (err) throw err;
            console.log("I'm done!!");
        }).catch(e => {
            console.log(e.message)
        });*/
}catch (e) {
    console.log(e.message)
}


/*let buffer1 = */
//let buffer2 = read_fragment(2280,0);

/*
let bufferTotal = buffer1.lenth + buffer2.lenth;
let totalBuffer = Buffer.concat( [buffer1,buffer2], bufferTotal);
console.log(buffer.toString('utf8', 0, totalBuffer));
/*
module.exports = {
    get_metrics
}

*/
