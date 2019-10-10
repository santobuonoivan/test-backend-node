const Pool = require("worker-threads-pool");
const pool = new Pool({ max: cpuCount });
const sortArrayWithWorker = arr => {
    return new Promise((resolve, reject) => {
        pool.acquire(workerScript, { workerData: arr }, (err, worker) => {
            if (err) {
                return reject(err);
            }
            worker.once("message", resolve);
            worker.once("error", reject);
        });
    });
};