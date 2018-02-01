const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports =  {
    // show warning when bundle files reach certain threshold
    performance: {
        hints: "warning"
    },

    // entry files
    entry: [
        path.resolve(__dirname, '../src/client/js/index')
    ],
    // default is web ( so can omit this ). Tell webpack to build specifically for web environment
    target: 'web',
    // in dev mode, webpack actually serve contents from memory, so the output stuff is just for show
    output: {
        path: path.resolve(__dirname, 'src'),
        // this is prefix to all our static resource. Think of it as a base folder
        // when this is set, the path for our bundle stuff in index.html will also change to include this publicPath value
        // this is just simulating dist folder for serving our stuff
        publicPath: '/',
        filename: 'bundle.js'
    },
    // add plugins to enhance webpack power ( linting, hot reloading, linting style ... )
    plugins: [
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: './src/client/html/index.html',
            inject: true
        })
    ],
    // for handling different file types. By default, webpack can only load standard js file.
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
            {test: /\.css$/, loaders: ['style-loader','css-loader']}
        ]
    }
};
