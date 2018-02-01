/*eslint-disable no-console */
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.prod');
const chalk = require('chalk');

// this assures the Babel dev config doesn't apply.
process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating bundle for production....'));

webpack(webpackConfig).run((err, stats) => {
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
    console.log(chalk.green('Build successful! Check dist folder!'));

    return 0;
});
