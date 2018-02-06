const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const path = require('path');
module.exports =  {
    entry: {
        vendor: ['jquery'] // add lib dependencies here
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },

    // show warning when bundle files reach certain threshold
    performance: {
        hints: "warning"
    },

    // default is web ( so can omit this ). Tell webpack to build specifically for web environment
    target: 'web',

    // add plugins to enhance webpack power ( linting, hot reloading, linting style ... )
    plugins: [
        // extract css contents and bundle them into a single file
        new ExtractTextPlugin('[name].[contenthash].css'),

        // This plugin is ideal for making sure that the bundle css doesn't contain duplicated chunk
        // Comment this out for now since for some reason it inlines the sourcemap information in the bundle
        // css file which increase its size
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorOptions: { discardComments: { removeAll: true }, sourcemap: true }
        // }),

        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
            inject: true // inject any script tags for me
            // minify: {
            //     collapseWhitespace: true,
            // }
        }),

        // Webpack by default uses incremental id for all the modules
        // These are given in order, and as the order can change with every new import added, the chunks ids may change with them.
        new webpack.HashedModuleIdsPlugin(),

        // webpack looks for any entries (besides vendor) that use dependencies specified in vendor
        // and bundle them into vendor. The webpack runtime and manifest will also be put here
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // add this so that the webpack runtime and manifest contents are extracted out of vendor bundle
        // and added to manifest instead
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ],

    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, use: [{loader: 'babel-loader'}]},
            {test: /\.css$/, use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    // { loader: 'css-loader' } use this if using optimizeCssAssetsPlugin
                    { loader: 'css-loader', options: { minimize: true, sourceMap: true } }
                    // if use any preprocessor add the loader here ( also add sourceMap again
                ]
            }) }
        ]
    }
};
