let path = require("path");
let webpack = require("webpack");
let merge = require("webpack-merge");
let baseWebpackConfig = require("./webpack.config.base");

module.exports = merge(baseWebpackConfig, {
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        // Minify js
        new webpack.optimize.UglifyJsPlugin()
    ]

});
