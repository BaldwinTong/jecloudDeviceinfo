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
  const {
    VUE_APP_SERVICE_PROXY,
    VUE_APP_MICRO_CONFIG_ROUTE,
    VUE_APP_MICRO_CONFIG_PROXY_VAR,
    VUE_APP_MICRO_CONFIG_ADMIN,
  } = envs;
  // 微应用路由
  const microRoute = getBaseRoute(envs, VUE_APP_MICRO_CONFIG_ROUTE);
  // 微应用代理地址
  const proxys = {};
  // 调试地址
  for (let key in envs) {
    if (key.startsWith(VUE_APP_MICRO_CONFIG_PROXY_VAR)) {
      const route =
        microRoute + '/' + key.replace(VUE_APP_MICRO_CONFIG_PROXY_VAR, '').toLocaleLowerCase();
      proxys[route] = { target: envs[key], changeOrigin: true };
    }
  }
  // 默认代理
  proxys[microRoute] = { target: VUE_APP_SERVICE_PROXY, changeOrigin: true };

  return VUE_APP_MICRO_CONFIG_ADMIN ? proxys : {};
}
/**
 * 获得路由地址
 * @param {*} envs
 * @param {*} path
 * @returns
 */
function getBaseRoute(envs, path = '') {
  const baseRoute = envs.VUE_APP_ROUTER_BASE || '/';
  if (path) {
    return baseRoute === '/' ? path : baseRoute + path;
  }
  return baseRoute;
}
/**
 * 获得项目根目录
 *
 * @param {*} envs
 * @return {*}
 */
function getPublicPath(envs) {
  // 主应用返回根目录
  if (envs.VUE_APP_MICRO_CONFIG_ADMIN) {
    return getBaseRoute(envs);
  }
  const route = getBaseRoute(envs, envs.VUE_APP_MICRO_CONFIG_ROUTE); // 微应用路由前缀
  const project = getProjectName(); // 项目名称
  const name = project.split('-').pop(); // 微应用名称
  return `${route}/${name}/`;
}

function getProjectName() {
  const project = process.cwd().split(path.sep).pop(); // 项目名称
  return project;
}
/**
 * 获得绝对路径
 *
 * @export
 * @param {*} dir
 * @return {*}
 */
module.exports = {
  resolve(dir) {
    return path.resolve(process.cwd(), '.', dir);
  },
  getBaseRoute,
  getMicroProxys,
  getPublicPath,
  resolveEnvs,
  isNumeric,
  getIPAdress,
  getProjectName,
};
