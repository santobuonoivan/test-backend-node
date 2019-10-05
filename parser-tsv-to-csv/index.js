const tsv = require('node-tsv-json');
const csvToJson = require('convert-csv-to-json');

function tsvToJson(input) {//  ./files/file1.tsv
    tsv({
        input: input, 
        output: "",
        parseRows: false
    },function(err, result) {
        if(err) {
            console.error(err);
        }else {
            console.log("parseado correctamente");
            return result;
        }
    });    
}

function jsonToCsv(input) {
    const json = csvToJson.fieldDelimiter(',').getJsonFromCsv(input);
    return json;   
}


let json = jsonToCsv( './../files/users.csv');
let sql = `INSERT INTO data(name, segment1, segment2, segment3, segment4, platformId, clientId) 
    VALUES`;
    for (let index = 0; index < json.length; index++) {
        const e = json[index];
        sql += `(${e.name},${e.segment1},${e.segment2},${e.segment3},${e.segment4},${e.platformId},${e.clientId}),`;
    } 
console.log ( sql );