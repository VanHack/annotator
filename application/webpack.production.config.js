const config = require('./webpack.config.js');

delete config.devtool;
delete config.output.pathinfo;

module.exports = config;
