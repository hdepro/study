/**
 * Created by heben on 2017/3/18.
 */

console.log(/^\/assets\//.test("/assets/test1"));
console.log(/^\/assets\/(\S*)/.exec("/assets/test1.js"));

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input1) => {
    const arr1=parseInt(input1);
    rl.on('line', (input2) => {
        const arr2=input2.split(" ").map(a => parseInt(a));
        console.log(arr1[0] + arr2[0]+ arr2[1]);
    })
});

rl.on('pause', () => {
    console.log('Readline paused.');
});
