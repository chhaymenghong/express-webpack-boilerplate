let path = require("path");
// let webpack = require("webpack");
let merge = require("webpack-merge");
let baseWebpackConfig = require("./webpack.config.base");
// baseWebpackConfig.entry.app.unshift("webpack-hot-middleware/client");
// baseWebpackConfig.entry.frontend.unshift("webpack-hot-middleware/client");
module.exports = merge(baseWebpackConfig,{
    // ( compilation speed vs quality ). There are different levels of sourcemapping quality
    devtool: 'inline-source-map',

    // in dev mode, webpack actually serve contents from memory, so the output path is not really doing anything
    output: {
        path: path.resolve(__dirname, 'src'),
        // (during dev mode, these configs are not used)
        publicPath: '/',
        filename: 'bundle.js'
    },


    plugins: [
        // uncomment to to set all use all loader in debug mode ( or just set in the loader itself
        // /However, until a loader has been updated to depend upon options being passed
        // directly to them, the LoaderOptionsPlugin exists to bridge the gap ( will be gone in the future )
        // new webpack.LoaderOptionsPlugin({
        //     debug: true
        // })
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.ProgressPlugin(function handler(percentage, msg) {/* ... */})
    ],
});


