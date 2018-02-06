const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");
module.exports = merge(baseWebpackConfig,{
    entry: {
        vendor: ['jquery'], // add lib dependencies here
        main: [path.resolve(__dirname, '../src/client/js/main'), 'webpack-hot-middleware/client?reload=true&noInfo=true']
    },

    // this is prefix to all our static resources.
    // when this is set, the path for our bundle stuff in index.html will also change to include this publicPath value
    // ie: 'publicPath:'/dist' => in index.html script src="/dist/main.js"
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },

    // ( compilation speed vs quality ). There are different levels of sourcemapping quality
    devtool: 'inline-source-map',
    plugins: [
        // uncomment to to set all use all loader in debug mode ( or just set in the loader itself
        // /However, until a loader has been updated to depend upon options being passed
        // directly to them, the LoaderOptionsPlugin exists to bridge the gap ( will be gone in the future )
        // new webpack.LoaderOptionsPlugin({
        //     debug: true
        // })

        // in dev only ( only use this with webpack-dev-server, but since we are using webpack-dev-middleware,
        new webpack.HotModuleReplacementPlugin(),

    ]

});


