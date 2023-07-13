const path = require('path');
const os = require('os');

/**
 * 解析系统变量
 *
 * @param {*} _envs
 * @return {*}
 */
function resolveEnvs(_envs) {
  const envs = {};
  Object.keys(_envs).forEach((key) => {
    if (key.startsWith('VUE_APP_') || ['NODE_ENV'].includes(key)) {
      envs[key] = _envs[key];
    }
  });
  for (let key in envs) {
    let val = envs[key];
    if (isNumeric(val)) {
      envs[key] = Number(val);
    } else if (['true', 'false'].includes(val)) {
      envs[key] = val == 'true';
    }
  }

  // 基础路径
  envs.PUBLIC_PATH = getPublicPath(envs);

  return envs;
}

function isNumeric(value) {
  return !Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value));
}

/**
 * 获取本机IP
 *
 * @return {*}
 */
function getIPAdress() {
  var interfaces = os.networkInterfaces();
  // console.log('interfaces', interfaces);
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
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

function getProjectName() {
  const project = process.cwd().split(path.sep).pop(); // 项目名称
  return project;
}
/**
 * 地址转换
 * @param {*} dir
 * @returns
 */
function resolve(dir) {
  return path.resolve(process.cwd(), '.', dir);
}
/**
 * 获取ant less全局变量
 * @return {*}
 */
function generateModifyVars() {
  return {
    hack: `true; @import (reference) "${resolve(
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
  getMicroProxys,
  generateModifyVars,
  resolve,
  getPublicPath,
  resolveEnvs,
  isNumeric,
  getIPAdress,
  getProjectName,
};
