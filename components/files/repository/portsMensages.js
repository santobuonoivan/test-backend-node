const { MessageChannel } = require('worker_threads');
const { port1, port2, port3, port4 } = new MessageChannel();
const moment = require('moment');

function refactorMetrics(srcMetrics) {
    return srcMetrics;
}


function started( time ) {
    return {
        response: {
            Status: "started",
            Started: time
        }
    }
}

function processing( time ) {
    return {
        response: {
            Status: "processing",
            Started: time
        }
    }
}

function failed( message ) {
    return {
        response: {
            Status: "failed",
            message: message
        }
    }
}

function ready( time, srcMetrics ) {
    let finished = moment().format('YYYY-MM-DDTHH:MM:SS');
    let metrics = refactorMetrics(srcMetrics);
    return {
        response: {
            Status: "ready",
            Started: time,
            Finished: finished,
            Metrics: metrics
        }
    }
}

module.exports = {
    processing,
    failed,
    started,
    ready
};