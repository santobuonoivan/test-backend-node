var express = require('express'),
    //set an instance of exress
    app = express();

const { Worker, isMainThread, parentPort } = require('worker_threads');

parentPort.on("message", message => {
    parentPort.postMessage(aCPUBoundTask(workerData.magicNumber))
});


//tell express what to do when the / route is requested
app.get('/', function (req, res) {
    if (isMainThread) {
        const worker = new Worker(__filename);
        worker.once('message', (message) => {
            console.log(message);  // Prints 'Hello, world!'.
        });
        worker.postMessage('Hello, world!');
    } else {
        // When a message from the parent thread is received, send it back:
        parentPort.once('message', (message) => {
            parentPort.postMessage(message);
        });
    }


    worker.parentPort('hbubugbg')



     return res.send([])
});

//wait for a connection
app.listen(5000, function () {
    console.log('The web server is running. Please open http://localhost:5000/ in your browser.');
});


