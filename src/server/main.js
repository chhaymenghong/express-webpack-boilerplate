// think of this file as where the whole server stuff start happening
const moment = require("moment");
const chalk = require("chalk");
const port = 3000;
const open = require('open');

chalk.bold("---------------------[ Server starting at %s ]---------------------------", moment().format("YYYY-MM-DD HH:mm:ss.SSS"));

const app = require("./core/express");

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});
