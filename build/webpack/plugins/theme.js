const { resolve, generateModifyVars } = require('../../utils');
module.exports = {
  config() {
    // less配置
    return {
      css: {
        loaderOptions: {
          less: {
            paths: [resolve('node_modules')],
            javascriptEnabled: true, //允许链式调用的换行
            modifyVars: generateModifyVars(),
          },
        },
      },
    };
  },
};
