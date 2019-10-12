const fs = require('fs');
const os = require('os');
const worker = require('worker');
const cpus = os.cpus().length;
const moment = require('moment');
const { processing, failed, started, ready } = require('./portsMensages');
const path = require('path');


exports.readAndGetMetrics = async function readAndGetMetrics(res,filename) {
    // load a few hundred thousand words into an array
    let dir = __dirname + path.sep + '../files/tsv' + path.sep + filename + '.tsv';
    let rowsList = fs.readFileSync(dir, 'utf8').split('\n');
    let start = moment().format('YYYY-MM-DDTHH:MM:SS');
    console.log(started(start));
    // create a group of workers (size defaults to os.cpus().length)
    let k_group = worker.group(__dirname + path.sep + 'myWorker.js', cpus);
    // processing pipeline
    console.log(processing(start));
    /* threads init */
    k_group
    // bind data from our list, dividing array evenly among workers
        .data(rowsList)
        // send data to workers and push them thru the first transform
        .map('get_metrics')
        // as soon as each worker finishes its previous task, forward each result
        //   to a new task in the same thread (keeping data in the same thread)
        //.thru('sort')
        /*
        .catch(e).then((e) => {
            console.log(receiveMessageOnPort(failed( e.message )));
        })*/
        // reduce multiple results into a single one
        .reduce('merge').then((a_merged_metrics) => {        // stop the timer
            return res.send(ready(start, a_merged_metrics));
        //console.log(a_merged_metrics);
    });

}