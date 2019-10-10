const fs = require('fs');
const worker = require('worker');

// load a few hundred thousand words into an array
let a_words = fs.readFileSync('/usr/share/dict/words', 'utf8').split('\n');

// start the timer
console.time('parallel');

// create a group of workers (size defaults to os.cpus().length)
let k_group = worker.group('./the-worker.js');

// processing pipeline
k_group
// bind data from our list, dividing array evenly among workers
    .data(a_words)

    // send data to workers and push them thru the first transform
    .map('reverse_letters')

    // as soon as each worker finishes its previous task, forward each result
    //   to a new task in the same thread (keeping data in the same thread)
    .thru('sort')

    // reduce multiple results into a single one
    .reduce('merge').then((a_sorted_words_reversed) => {
    fs.writeFile('out', a_sorted_words_reversed.join('\n'), (e_write) => {
        if(e_write) throw new Error(e_write);

        // stop the timer
        console.timeEnd('parallel');
    });
});