/**
 * 系统常量配置文件，命名规则
 * 平台核心：JE_模块_变量名
 * 业务常量：业务(MENU)_模块_变量名
 */
// eslint-disable-next-line no-undef
export const CLI_ENVS = __CLI_ENVS__; // 项目运行时变量
export const AJAX_BASE_URL = CLI_ENVS.VUE_APP_SERVICE_PROXY_PREFIX || window.AJAX_BASE_URL || ''; // 请求基础链接
export const JE_SETTINGS_LOGOUT_URL = '/login'; // 退出登录链接

// 全局变量名
export const GlobalSettingsEnum = {
  GLOBAL_SETTINGS_LOCALE: 'GLOBAL_SETTINGS_LOCALE', // 国际化
  GLOBAL_SETTINGS_TOKENKEY: 'authorization', // token key
};
