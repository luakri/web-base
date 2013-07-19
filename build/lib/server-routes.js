/*jshint curly: true, eqeqeq: true, immed: true, indent: 4, browser: true, jquery: true, evil: true, regexdash: true, node: true, trailing: true, sub: true, unused: true, devel: true, white: true */


process.addListener('uncaughtException', function (err) {
    'use strict';

    console.log('------------------------');
    console.log('Exception: ' + err);
    console.log(err.stack);
    console.log('------------------------');
    console.trace();
});


var fs = require('fs'),
    express = require('express'),
    app = express(),
    _ = require('lodash'),
    Config = require('./config'),

    ServerRoutes = (function ()
    {
        'use strict';

        function ServerRoutes(options)
        {
            this.options = options;

            this.init.apply(this);
        }

        ServerRoutes.prototype =
        {
            defaults:
            {
                testJson : 'test.json'
            },

            readJsonFileSync : function (filepath, encoding)
            {
                var data = null;

                if (typeof (encoding) === 'undefined')
                {
                    encoding = 'utf8';
                }

                try
                {
                    data = fs.readFileSync(filepath, encoding);
                }
                catch (e)
                {
                    if (e.code === 'ENOENT')
                    {
                        console.log(filepath + ' not found!');

                        data = '[{"error": "json not found"}]';
                    }
                    else
                    {
                        throw e;
                    }
                }

                return JSON.parse(data);
            },

            jsonRoute : function ()
            {
                var self = this,
                    file = '';

                app
                .get('/request-data', function (req, res)
                {
                    file = self.readJsonFileSync(self.dataPath + self.settings.testJson);

                    res.json(file);
                });

                return this;
            },

            mainRoute : function ()
            {
                var self = this;

                console.log('Request starting...');

                app
                .use(express.static(self.contentPath));

                app
                .get("/", function (req, res)
                {
                    res
                    .header('Cache-Control', Config.HEADER_CACHE_CONTROL);

                    fs
                    .createReadStream(Config.ROOT_PATH + Config.CONTENT_PATH + Config.START_PAGE)
                    .pipe(res);

                    res
                    .send('404', 404);
                });

                app
                .listen(Config.LISTEN_PORT);

                console.log("Server listening on http://localhost:" + Config.LISTEN_PORT);

                return this;
            },

            manageRoutes : function ()
            {
                var self = this;

                self.mainRoute();

                self.jsonRoute();

                return this;
            },

            init: function ()
            {
                this.settings = _.assign({}, this.defaults, this.options);

                this.contentPath = __dirname + '../../../' + Config.CONTENT_PATH;

                this.dataPath = this.contentPath + Config.DATA_PATH;

                this.manageRoutes();

                return this;
            }
        };

        ServerRoutes.settings = ServerRoutes.prototype.settings;

        return ServerRoutes;

    })();

module.exports = ServerRoutes;