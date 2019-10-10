//const worker = require('worker');
const _ = require('lodash');

let metric1 = {
    "1": {
        "a": 1,
        "b": 2,
    },
    "2": {
        "a": 1,
    },
    "3": {
        "a": 1,
        "b": 1,
        "c": 1,
    },
};

let metric2 = {
    "1": {
        "a": 1,
        "b": 2,
    },
    "2": {
        "a": 4,
    },
    "4": {
        "a": 1,
        "b": 1,
        "c": 1,
    },
};



const MERGE_METRICS = (metric1, metric2) => {
    let array_keys_1 = Object.keys(metric1);
    let array_keys_2 = Object.keys(metric2);
    let intersection_keys = _.intersection( array_keys_1, array_keys_2);
    let concat = _.union(metric1.array,metric2.array);
    return concat;
    /*
    return _.map( intersection_keys, (key) => {
        try {
            if( isNaN(metrics[segment][code])) metrics[segment][code]=0;
            metrics[segment][code]++;
        }catch (e) {
            metrics[segment] = {};
            metrics[segment][code]=1;
        }
    });*/
}

let merged = MERGE_METRICS(metric1,metric2);

/*
worker.dedicated({
    // take a list of words and reverse the letters in each word
    get_metrics(line) {
        let lineSplit = _.split( line, '\t');
        let code = lineSplit[2];
        let segments = _.split( lineSplit[1], ',');
        for (let i = 0; i < segments.length ; i++) {
            const segment = segments[i];
            try {
                if( isNaN(metrics[segment][code])) metrics[segment][code]=0;
                metrics[segment][code]++;
            }catch (e) {
                metrics[segment] = {};
                metrics[segment][code]=1;
            }
        }
        return metrics
    },

    // take a list of words and sort them alphabetically
    /*
    sort(a_list) {
        return a_list.sort(F_SORT_ALPHABETICAL);
    },*/
/*
    // take two sorted lists of words and merge them in sorted order
    merge(a_line_a, a_line_b) {
        return worker.merge(a_line_a, a_line_b, MERGE_METRICS);
    },
});*/