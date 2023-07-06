const webpack = require('./build/webpack/webpack.config');
const plugins = require('./build/webpack/plugins');
const config = {
  ...webpack.config(),
  ...plugins.config(),
};
module.exports = config;
