const express = require('express');
const path = require('path');
const compress = require("compression");
const config = require('../config/config');
const route1 = require('../routes/route1');

// An express-style development middleware for use with webpack bundles
// and allows for serving of the files emitted from webpack.
// As a middle, it tells express to load resources using webpack
// consult this: https://github.com/webpack/webpack-dev-middleware for more info on options
// app.use(require('webpack-dev-middleware')(compiler, {
//     // to display any error, warning ....
//     logLevel: 'info',
//     // this middleware will bound to this path and serve stuff from webpack when user making request from this path
//     // should be the same as webpack publicPath
//     publicPath: webpackConfig.output.publicPath,
//     stats: {colors: true}
// }));



/* eslint-disable no-console */
module.exports = function() {
    let app = express();
    initMiddleware(app);
    initWebpack(app);
    initRoutes(app);
    return app;
};

/**
 * Initialize Middlewares
 */
function initMiddleware(app) {
    // Should be placed before express.static
    // app.use(compress({
    //     filter: function(req, res) {
    //         return /json|text|javascript|css/.test(res.getHeader("Content-Type"));
    //     },
    //     level: 3,
    //     threshold: 512
    // }));

    if (config.isProductionMode()) {
        // Setting up static folder
        // app.use(express["static"](path.join(serverFolder, "public")));
    }
}

/**
 * Initialize Webpack hot reload module.
 * An express-style development middleware for use with webpack bundles
 * and allows for serving of the files emitted from webpack.
 * As a middle, it tells express to load resources using webpack
 * consult this: https://github.com/webpack/webpack-dev-middleware for more info on options
 */
function initWebpack(app) {
    // Webpack middleware in development mode
    if (!config.isProductionMode()) {
        console.log('hong');
        const webpack = require('webpack');
        const webpackConfig = require('../../../build/webpack.config.dev');
        const compiler = webpack(webpackConfig);

        const devMiddleware = require('webpack-dev-middleware');
        app.use(devMiddleware(compiler, {
            logLevel: 'info',
            publicPath: webpackConfig.output.publicPath,
            stats: {colors: true}
            // headers: { "Access-Control-Allow-Origin": "*" }
        }));

        // const hotMiddleware = require('webpack-hot-middleware');
        // app.use(hotMiddleware(compiler, {}));
    }
}

/** Initialize routes **/
function initRoutes(app) {
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/html/index.html'));
    });

    // make use of external route handlers
    app.use('/users', route1);

    // add other routes here
}


