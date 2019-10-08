//const { csvToJson,tsvToJson } = require('./../../files');
const fs = require("fs");
const d3 = require("d3");
const _ = require("lodash");
const path = require('path');
const sortJsonArray = require('sort-json-array');



const lineReader = require('line-reader');
Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);
const { get_metrics } = require('./../files/tsv/test');






function csvToJson(){
    let filename = __dirname+'/../files/csv/users.csv';
    try {
        let data = fs.readFileSync(filename,'utf-8');
        data = d3.csvParse(data);
        return JSON.stringify(data);
    }catch (e) {
        console.log(e);
    }

}

/* GET ALL */
exports.all_data = async function (req, res, next) {
    const { sort,sortField,fields,limit } = req.body;
    try{
        let jsonResponse = JSON.parse(csvToJson());
        if(jsonResponse.length > 0) {
            // PICK
            if ( _.isArray(fields) && !_.isEmpty(fields))
                jsonResponse = _.map(jsonResponse, (obj) => _.pick(obj, fields));
            // SORT
            jsonResponse = sortJsonArray(jsonResponse,sortField,sort);
            // LIMIT
            if ( limit <= jsonResponse.length )
                jsonResponse = _.dropRight(jsonResponse, jsonResponse.length - limit);

            return res.send({response:jsonResponse});
        }
        return res.send({message: 'data not found'});
    }catch (e) {
        return res.status(400).send({
            e
        });
    }
};


exports.metrics = async function (req, res, next) {
    let metrics = [];
    try{

        let dir = __dirname + path.sep +'file1.tsv';
        eachLine(dir, function(line) {
            let lineSplit = _.split( line,'\t');
            let user_id = lineSplit[0];
            let cod = lineSplit[2];
            //console.log(cod);
            let segments = _.split(lineSplit[1],',');
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i];
                metrics[ segment ][ cod ] += 1;

            }
        }).then(function (err) {
            if (err) throw err;
            console.log("I'm done!!");
        });
        return res.send({message: 'data not found'});
    }catch (e) {
        return res.status(400).send({ e });
    }
}
