process.addListener('uncaughtException', function (err, stack) {
    'use strict';

    console.log('------------------------');
    console.log('Exception: ' + err);
    console.log(err.stack);
    console.log('------------------------');
});

var fs = require("fs"),
    express = require("express"),
    site = express.createServer();

// main class.
function Createserver(options) {
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee(arguments);
    }

    var self = this;

    self.settings = {
        port: options.port
    };

    // init class.
    self.init();
}

// init methods for minification.
Createserver.prototype.init = function () {
    var self = this;

    console.log('Request starting...');

    site.use(express.static(__dirname + '../../../public'));

    site.get("*", function (req, res) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

        fs.createReadStream("./public/index.html").pipe(res);

        res.send('404', 404);
    });

    site.listen(self.settings.port);

    console.log("Server listening on http://localhost:" + self.settings.port);
};

module.exports = Createserver;