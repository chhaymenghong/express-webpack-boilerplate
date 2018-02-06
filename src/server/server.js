const express = require('express');
const path = require('path');
const compress = require("compression");
// const chalk = require("chalk");
const open = require('open');

const port = process.env.PORT || 3000;
const config = require('./config/config');
const route1 = require('./routers/route1');


/* eslint-disable no-console */
// chalk.bold("---------------------[ Server starting at %s ]---------------------------", moment().format("YYYY-MM-DD HH:mm:ss.SSS"));

const app = express();
// app.use((req, res, next)) to add (common header or whatever at app wide level )
initMiddleware(app);
initRoutes(app);

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});


/**
 * Initialize Middleware
 */
function initMiddleware(app) {
    // Should be placed before express.static
    app.use(compress({
        filter: function(req, res) {
            return /json|text|javascript|css/.test(res.getHeader("Content-Type"));
        },
        level: 6,
        threshold: 512 // in bytes
    }));

    if (config.isProductionMode()) {
        _serveAppInProdMode(app);
    } else if(config.isDevMode()) {
        _serveAppInDevMode(app);
    }
}

/** Initialize routers **/
function initRoutes(app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });

    // make use of external route handlers
    // 'users' is a prefix for route1 router
    app.use('/users', route1);
}

function _serveAppInProdMode(app) {
    console.log('running in prod mode');
    // tell express that "dist" will be the root directory to serve static files from ( excluding
    // the one we handle manually ( see app.get('/') below ) automatically requested resources will be served from here
    // ( make sure to use path.resolve to get the correct absolute path
    app.use(express.static(path.resolve(__dirname, '../../dist'), { maxAge: '1y' }));
}

function _serveAppInDevMode(app) {
    // Initialize Webpack hot reload module.
    // consult this: https://github.com/webpack/webpack-dev-middleware for more info on options
    console.log('running in dev mode');
    const webpack = require('webpack');
    const webpackConfig = require('../../build/webpack.config.dev');
    const compiler = webpack(webpackConfig);

    const devMiddleware = require('webpack-dev-middleware');
    app.use(devMiddleware(compiler, {
        logLevel: 'info',
        publicPath: webpackConfig.output.publicPath,
        stats: {colors: true}
    }));
    app.use(require("webpack-hot-middleware")(compiler));
}


