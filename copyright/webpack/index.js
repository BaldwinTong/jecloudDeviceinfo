const InjectPlugin = require('webpack-inject-plugin').default;
// 动态引入版权校验
const plugin = new InjectPlugin(function () {
  return "import('./copyright');";
});

module.exports = {
  build(config) {
    // 开发环境不做处理
    if (process.env.NODE_ENV !== 'development') {
      config.configureWebpack.plugins.push(plugin);
    }
  },
};
