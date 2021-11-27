const { resolveEnvs } = require('../../utils');
const theme = require('./theme');
const server = require('./server');
const pages = require('./pages');
const envs = resolveEnvs(process.env);

module.exports = {
  defaultTheme: theme.defaultTheme,
  config() {
    return {
      ...theme.config(envs),
      ...server.config(envs),
      ...pages.config(envs),
    };
  },
};
