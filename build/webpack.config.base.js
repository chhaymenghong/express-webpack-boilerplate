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
    // add plugins to enhance webpack power ( linting, hot reloading, linting style ... )
    plugins: [
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
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
