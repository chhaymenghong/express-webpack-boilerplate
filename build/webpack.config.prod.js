let path = require("path");
let webpack = require("webpack");
let merge = require("webpack-merge");
let baseWebpackConfig = require("./webpack.config.base");

module.exports = merge(baseWebpackConfig, {
    devtool: "source-map", // source map quality ( this is for prod )
    output: {
        path: path.resolve(__dirname, '../dist'),
        // this is prefix to all our static resources.
        // when this is set, the path for our bundle stuff in index.html will also change to include this publicPath value
        // ie: 'publicPath:'/dist' => in index.html script src="/dist/index.js"
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true // tell this plugin to generate that
        })
    ]

});
