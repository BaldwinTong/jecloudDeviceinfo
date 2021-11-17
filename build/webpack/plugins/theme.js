const { lessVars, debugVars } = require('../../theme/config');
const { getLess } = require('@zougt/some-loader-utils');
const { resolve } = require('../../utils');
module.exports = {
  defaultTheme: lessVars[0].scopeName,
  config(envs) {
    const { VUE_APP_THEME_COUNT } = envs;
    // less配置
    const less = {
      paths: [resolve('node_modules')],
      javascriptEnabled: true, //允许链式调用的换行
    };

    // 调试模式
    if (VUE_APP_THEME_COUNT === -1) {
      less.globalVars = debugVars;
    } else {
      // 主题模式
      less.implementation = getLess({
        getMultipleScopeVars: (lessOptions) => {
          return lessVars;
        },
      });
    }
    return {
      css: {
        loaderOptions: {
          less,
        },
      },
    };
  },
};
