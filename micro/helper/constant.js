/**
 * 系统常量配置文件，命名规则
 * 平台核心：JE_模块_变量名
 * 业务常量：业务(MENU)_模块_变量名
 */
const CLI_ENVS = window['__CLI_ENVS__'] || {}; // 项目运行时变量
export { CLI_ENVS };

// axios 前缀，用于调试使用
export const JE_AXIOS_BASEURL = CLI_ENVS.VUE_APP_SERVE_PROXY_PREFIX;
