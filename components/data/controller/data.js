//const { csvToJson,tsvToJson } = require('./../../files');
const fs = require("fs");
const d3 = require("d3");
const _ = require("lodash");
const sortJsonArray = require('sort-json-array');

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
