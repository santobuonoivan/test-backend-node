const fs = require("fs");
const d3 = require("d3");
const _ = require("lodash");
const humanize = require('humanizejs');
const moment = require('moment');
//const log = require('log');
const lineReader = require('line-reader'),
    Promise = require('bluebird');

const os = require('os');
const worker = require('worker');
const cpus = os.cpus().length;
const path = require('path');


const { MessageChannel } = require('worker_threads');

const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message));




const eachLine = Promise.promisify(lineReader.eachLine);
const { processing, failed, started, ready } = require('./../repository/portsMensages');


exports.all_files = async function (req, res) {
    let {humanreadable} = req.body;
    let keys = ["name","size"];
    try {
        let filenames = fs.readdirSync(__dirname+'/../../data/files/tsv/');
        let filesSizes;
        if ( humanreadable !== true )
            filesSizes = _.map(filenames, (filename) => humanize.toFileSize(fileStats( filename )));
        else
            filesSizes = _.map(filenames, (filename) => fileStats( filename ));
        let response = [];
        for (let i = 0; i < filenames.length ; i++) {
            response.push({
                name:filenames[i],
                size:filesSizes[i],
            });
        }

        return res.send({response});
    }catch (e) {
        return res.status(400).send({
            e
        });
    }
};

exports.metrics = async function (req, res) {
    const { filename } = req.body;
    try {
        let dir = __dirname + path.sep + '../files/tsv' + path.sep + filename + '.tsv';
        let rowsList = fs.readFileSync(dir, 'utf8').split('\n');


        /***********************************************************************/
        let start = moment().format('YYYY-MM-DDTHH:MM:SS');

        port2.postMessage(started(start));
        //res.write(JSON.stringify(started(start)));
        // create a group of workers (size defaults to os.cpus().length)
        let k_group = worker.group(__dirname + path.sep + '../repository/myWorker.js', cpus);
        // processing pipeline
        //res.write(JSON.stringify(processing(start)));

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
            //res.write(JSON.stringify(ready(start, a_merged_metrics)));
            //res.end();
            //console.log(a_merged_metrics);
        });
        return res.status(200).send({});
    }catch (e) {
        return res.status(400).send({
            error: e.message
        });
    }



};



function fileStats(filename) {
    const stats = fs.statSync(__dirname+'/../../data/files/tsv/'+filename);
    const fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
}
