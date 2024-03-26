const { loadEnvs: _loadEnvs, resolvePath, getIPAdress, getProjectName } = require('@jecloud/vue');

/**
 * 加载系统变量
 *
 * @param {*} mode 环境变量
 * @return {*}
 */
function loadEnvs(mode) {
  const envs = _loadEnvs(mode || process.env.NODE_ENV);
  // 基础路径
  envs.PUBLIC_PATH = getPublicPath(envs);
  return envs;
}

/**
 * 微应用代理地址
 * @param {*} envs
 * @returns
 */
function getMicroProxys(envs) {
  // 代理地址，代理地址前缀
  const { VUE_APP_SERVICE_PROXY, VUE_APP_PUBLIC_PATH_MICRO, VUE_APP_ADMIN } = envs;
  // 微应用路由
  const microRoute = getPublicPath(envs) + VUE_APP_PUBLIC_PATH_MICRO + '/';
  // 微应用代理地址
  const proxys = {};
  // 默认代理
  proxys[microRoute] = {
    target: VUE_APP_SERVICE_PROXY,
    changeOrigin: true,
  };
  return VUE_APP_ADMIN ? proxys : {};
}

/**
 * 获得项目根目录
 *
 * @param {*} envs
 * @return {*}
 */
function getPublicPath(envs) {
  // 基础地址
  let publicPath = envs.VUE_APP_PUBLIC_PATH || '/';
  // 兼容处理，默认以 / 结尾
  publicPath = publicPath.endsWith('/') ? publicPath : publicPath + '/';
  // 主应用地址
  if (envs.VUE_APP_ADMIN) {
    return publicPath;
  }
  // 微应用名称
  const publicPathMicro = envs.VUE_APP_PUBLIC_PATH_MICRO || 'micro';
  // 项目名称
  const project = getProjectName().split('-').pop();
  const publicPathProject = envs.VUE_APP_PUBLIC_PATH_PROJECT || project;
  // 微应用地址
  return `${publicPath}${publicPathMicro}/${publicPathProject}/`;
}

/**
 * 获取ant less全局变量
 * @return {*}
 */
function generateModifyVars() {
  return {
    hack: `true; @import (reference) "${resolvePath(
      'service/common/assets/themes/theme-variable.less',
    )}";`,
  };
}
/**
 * 获得绝对路径
 *
 * @export
 * @param {*} dir
 * @return {*}
 */
module.exports = {
  resolve: resolvePath,
  getMicroProxys,
  generateModifyVars,
  getPublicPath,
  loadEnvs,
  getIPAdress,
  getProjectName,
};
