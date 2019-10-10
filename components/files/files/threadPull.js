const os = require('os');
const Pool = require('worker-threads-pool');
const pool = new Pool({max: os.cpus().length});

for (let i = 0; i < 100; i++) {
    pool.acquire('./myWorker.js', function (err, worker) {
        if (err) throw err
        console.log(`started worker ${i} (pool size: ${pool.size})`)
        worker.on('exit', function () {
            console.log(`worker ${i} exited (pool size: ${pool.size})`)
        })
    })
}