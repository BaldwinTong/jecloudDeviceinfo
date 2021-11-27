const webpack = require('./build/webpack/webpack.config');
const plugins = require('./build/webpack/plugins');

module.exports = {
  ...webpack.config(),
  ...plugins.config(),
};
