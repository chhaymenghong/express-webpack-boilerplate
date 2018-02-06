const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");
module.exports = merge(baseWebpackConfig,{
    entry: {
        main: [path.resolve(__dirname, '../src/client/js/main'),
            // enable hot reloading
            'webpack-hot-middleware/client?reload=true&noInfo=true']
    },

    output: {
        // must use hash instead of chunkhash because we uses hot module reloading
        // also because of this long term caching in dev mode is not working, because hash
        // is generated as a result of the whole changes ( vendor, manifest, custom codes ..)
        // chunkhash is generated for each bundle
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


