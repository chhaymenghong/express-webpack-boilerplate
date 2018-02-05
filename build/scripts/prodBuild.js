/**
 * Generate the bundle and reports any issues
 * ( same thing as running webpack on the command line )
 */

/*eslint-disable no-console */
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.prod');
const chalk = require('chalk');

// a lot of libraries run differently based on this setting ( babel .... )
process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating a dist folder for use in production....'));

webpack(webpackConfig).run((err, stats) => {
    _generateStates(err, stats);
    return 0;
});

function _generateStates(err, stats) {
    if (err) {
        console.log(chalk.red(err));
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }

    if (jsonStats.hasWarnings) {
        console.log(chalk.yellow('Webpack generated the following warnings: '));
        jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }

    console.log(`Webpack stats: ${stats}`);

    // if we got this far, the build succeeded.
    console.log(chalk.green('Production build is successful and is available in dist folder'));
}
