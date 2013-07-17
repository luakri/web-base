/*jshint curly: true, eqeqeq: true, immed: true, indent: 4, browser: true, jquery: true, evil: true, regexdash: true, node: true, trailing: true, sub: true, unused: true, devel: true, white: true */


process.addListener('uncaughtException', function (err) {
    'use strict';

    console.log('------------------------');
    console.log('Exception: ' + err);
    console.log(err.stack);
    console.log('------------------------');
    console.trace();
});


var fs = require("fs"),
    express = require("express"),
    _ = require("lodash"),
    site = express(),

    Createserver = (function ()
    {
        'use strict';

        function Createserver(options)
        {
            this.options = options;

            this.init.apply(this);
        }

        Createserver.prototype =
        {
            defaults:
            {
                port            : 4000,
                publicFolder    : 'public',
                startPage       : 'index.html'
            },

            render : function ()
            {
                var self = this;

                console.log('Request starting...');

                site
                .use(express.static(__dirname + '../../../' + self.settings.publicFolder));

                site
                .get("*", function (req, res)
                {
                    res
                    .header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

                    fs
                    .createReadStream('./' + self.settings.publicFolder + '/' + self.settings.startPage)
                    .pipe(res);

                    res
                    .send('404', 404);
                });

                site
                .listen(self.settings.port);

                console.log("Server listening on http://localhost:" + self.settings.port);

                return this;
            },

            init: function ()
            {
                this.settings = _.assign({}, this.defaults, this.options);

                this.render();

                return this;
            }
        };

        Createserver.settings = Createserver.prototype.settings;

        return Createserver;

    })();

module.exports = Createserver;