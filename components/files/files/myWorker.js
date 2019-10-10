const worker = require('worker');
const _ = require('lodash');

function MERGE_METRICS(metric1, metric2) {
    return _.mergeWith(metric1, metric2, (objValue, srcValue) => {
        if (!objValue || !srcValue) return _.merge(objValue, srcValue);
        return _.mergeWith(objValue, srcValue, (value1, value2) => {
            if (!value1 || !value2) return value1 || value2;
            return value1 + value2;
        });
    });
};

function generateMetrics(lines){
    let metrics = {};
    return _.map(lines, (line) => {
        let lineSplit = _.split(line, '\t');
        let code = lineSplit[2];
        let segments = _.split(lineSplit[1], ',');
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            try {
                if (isNaN(metrics[segment][code])) metrics[segment][code] = 0;
                metrics[segment][code]++;
            } catch (e) {
                metrics[segment] = {};
                metrics[segment][code] = 1;
            }
        }
        return metrics;
    });
}


worker.dedicated({
    // take a list of words and reverse the letters in each word
    get_metrics(lines) {
        try {
            return generateMetrics(lines);
        }catch (e) {
            console.log(e.message);
        }
    },

    // take two sorted lists of words and merge them in sorted order
    merge(a_line_a, a_line_b) {
        let response = worker.merge_sorted(a_line_a, a_line_b, MERGE_METRICS;
        return response;
    },
});