/*jshint curly: true, eqeqeq: true, immed: true, indent: 4, browser: true, jquery: true, evil: true, regexdash: true, node: true, trailing: true, sub: true, unused: true, devel: true, white: true */


process.addListener('uncaughtException', function (err) {
    'use strict';

    console.log('------------------------');
    console.log('Exception: ' + err);
    console.log(err.stack);
    console.log('------------------------');
    console.trace();
});

var Config = {};

Config.LISTEN_PORT = 4000;
Config.ROOT_PATH = './';
Config.CONTENT_PATH = 'public/';
Config.DATA_PATH = 'data/';
Config.START_PAGE = 'index.html';
Config.HEADER_CACHE_CONTROL = 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0';


module.exports = Config;