// process.env.NODE_ENV can be specified on the command line when running the express server
// cloud services also knows how to set this up
module.exports = {
    isDevMode() {
        return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    },

    isProductionMode() {
        return process.env.NODE_ENV === "production";
    }
};
