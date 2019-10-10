const fs = require('fs');
const os = require('os');
const worker = require('worker');
const cpus = os.cpus().length;

/******************************************************************/

const path = require('path');

// load a few hundred thousand words into an array
let dir = __dirname + path.sep +'tsv' + path.sep + 'file1.tsv';
let rowsList = fs.readFileSync(dir, 'utf8').split('\n');
//console.log(a_words);


/***********************************************************************/


// start the timer
console.time('parallel');

// create a group of workers (size defaults to os.cpus().length)
let k_group = worker.group(__dirname + path.sep +'myWorker.js', cpus);

// processing pipeline
k_group
// bind data from our list, dividing array evenly among workers
    .data(rowsList)
    // send data to workers and push them thru the first transform
    .map('get_metrics')
    // as soon as each worker finishes its previous task, forward each result
    //   to a new task in the same thread (keeping data in the same thread)
    //.thru('sort')
    // reduce multiple results into a single one
    .reduce('merge').then((a_merged_metrics) => {
        // stop the timer
        console.timeEnd('parallel');
        console.log(a_merged_metrics);
    });
