/**
 * 系统常量配置文件，命名规则
 * 平台核心：JE_模块_变量名
 * 业务常量：业务(MENU)_模块_变量名
 */
const JECLI_ENVS = window['__JECLI_ENVS__'] || {}; // 项目运行时变量，自动去除 VUE_ 开头
const { APP_SERVE_PROXY_PREFIX, APP_HTML_TITLE, APP_HTML_ICON } = JECLI_ENVS;
export { APP_HTML_TITLE, APP_HTML_ICON };

// axios 前缀，用于调试使用
export const JE_AXIOS_BASEURL = APP_SERVE_PROXY_PREFIX;
