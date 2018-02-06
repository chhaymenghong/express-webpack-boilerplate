const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");

module.exports = merge(baseWebpackConfig, {
    // entry files
    entry: {
        main: path.resolve(__dirname, '../src/client/js/main'),
        vendor: ['jquery'], // add lib dependencies here
    },

    // this is prefix to all our static resources.
    // when this is set, the path for our bundle stuff in index.html will also change to include this publicPath value
    // ie: 'publicPath:'/dist' => in index.html script src="/dist/main.js"
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },

    devtool: "source-map", // source map quality ( this is for prod )

    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true // tell this plugin to generate that
        // }),
        // we can't use this to replace the env setting in server.js because that is run in a different process
        // but this is used to optimize library ( react vue .... )
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // })

    ]

});
