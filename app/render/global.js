// This should be put at the top of every html file to set global variables for
// every script that's run.


global.__base = __dirname.match(/.*prattlebox/)[0];

global.prattle = require(__base + '/app/components/prattle'); //jshint ignore:line

global.$ = require(__base + '/app/static/lib/jquery.min.js');
