const webpack = require('./build/webpack/webpack.config');
const plugins = require('./build/webpack/plugins');
const config = {
  ...webpack.config(),
  ...plugins.config(),
};
require('./copyright/webpack').build(config);
module.exports = config;
