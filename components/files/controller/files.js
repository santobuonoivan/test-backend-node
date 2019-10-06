const fs = require("fs");
const d3 = require("d3");
const _ = require("lodash");
const humanize = require('humanizejs');
const moment = require('moment');

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
    const dirname = __dirname+'/../../data/files/tsv/'+filename;
    try {
        let result =( tsvToJson(dirname));
        fs.writeFileSync(__dirname+'/../../../requires/test.json',result);
        return res.send('listo');
    }catch (e) {
        return res.status(400).send({e});
    }
};


function tsvToJson(dirname){
    const started = moment().format('YYYY-MM-DDTHH:MM:SS');
    let data = fs.readFileSync(dirname, "utf8");
    data = JSON.stringify(d3.tsvParse("User_id\tsegments\tcountry\n"+data), null, 4);
    const finished = moment().format('YYYY-MM-DDTHH:MM:SS');
    return data;
}



function fileStats(filename) {
    const stats = fs.statSync(__dirname+'/../../data/files/tsv/'+filename);
    const fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
}
