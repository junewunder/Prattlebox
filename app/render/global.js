// This should be put at the top of every html file to set global variables for
// every script that's run.

console.log('dirname:');
console.log(__dirname);
global.__base = __dirname + '/../../..';

global.prattle = require(__base + '/app/prattle');

global.$ = require(__base + '/app/static/lib/jquery.min.js');
