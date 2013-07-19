/*jshint curly: true, eqeqeq: true, immed: true, indent: 4, browser: true, jquery: true, evil: true, regexdash: true, node: true, trailing: true, sub: true, unused: true, devel: true, white: true */


process.addListener('uncaughtException', function (err) {
    'use strict';

    console.log('------------------------');
    console.log('Exception: ' + err);
    console.log(err.stack);
    console.log('------------------------');
    console.trace();
});


var ServerRoutes = require('./server-routes'),
    _ = require('lodash'),

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

            },

            manageRoutes : function ()
            {
                var self = this;

                self.serverRoutes = new ServerRoutes(self.settings);

                return this;
            },

            init: function ()
            {
                this.settings = _.assign({}, this.defaults, this.options);

                this.manageRoutes();

                return this;
            }
        };

        Createserver.settings = Createserver.prototype.settings;

        return Createserver;

    })();

module.exports = Createserver;