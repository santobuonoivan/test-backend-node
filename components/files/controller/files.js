const fs = require("fs");
const d3 = require("d3");
const _ = require("lodash");
const humanize = require('humanizejs');
const moment = require('moment');
const log = require('log');

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
    const dirname = __dirname+'/../files/tsv/'+filename;
    const lineReader = require('line-reader'),
    Promise = require('bluebird');

    const eachLine = Promise.promisify(lineReader.eachLine);
    let metrics = {};
    let response = {};
    response['started'] = moment().format('YYYY-MM-DDTHH:MM:SS');
    response['status'] = 'started';
    /* START */
    //log("response: %o",response);
    console.log(response);
    let process = false;
    eachLine( dirname, function(line) {

        if(!process) {
            /* PROCESS */
            response['status'] = 'processing';
            console.log(response);
            process = true;
        }
        let lineSplit = _.split( line, '\t');
        let code = lineSplit[2];
        let segments = _.split( lineSplit[1], ',');
        for (let i = 0; i < segments.length ; i++) {
            const segment = segments[i];
            try {
                if( isNaN(metrics[segment][code]))
                    metrics[segment][code]=0;
                metrics[segment][code]++;
            }catch (e) {
                metrics[segment] = {};
                metrics[segment][code]=1;
            }
        }
    }).then(function() {
        /* FINISH */
        response['finished'] = moment().format('YYYY-MM-DDTHH:MM:SS');
        response['metrics'] = metrics;
        response['status'] = 'finished';
        console.log(response);
        return res.status(200).send(response);
    }).catch(function(err) {
        /* FAIL */
        response['status'] = 'failed';
        response['Message'] = 'Wrong file format';
        console.log(response);
        return res.status(400).send(response,err);

    });


};



function fileStats(filename) {
    const stats = fs.statSync(__dirname+'/../../data/files/tsv/'+filename);
    const fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
}
