/**
 * 系统常量配置文件，命名规则
 * 平台核心：JE_模块_变量名
 * 业务常量：业务(MENU)_模块_变量名
 */

// const { VUE_APP_SERVE_PROXY_PREFIX } = process.env; // vuecli
const { VUE_APP_SERVE_PROXY_PREFIX } = import.meta.env; // vite

// axios 前缀，用于调试使用
export const JE_AXIOS_BASEURL = VUE_APP_SERVE_PROXY_PREFIX;
