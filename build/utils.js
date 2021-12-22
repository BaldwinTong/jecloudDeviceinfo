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
    // 处理微应用的服务地址，如果是本地服务，改成IP
    if (key.startsWith(envs.VUE_APP_MICRO_CONFIG_PREFIX_SERVICE)) {
      envs[key] = val.replace('localhost', getIPAdress());
    }
  }
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
 * 获得项目根目录
 *
 * @param {*} envs
 * @return {*}
 */
function getPublicPath(envs) {
  const prefix = envs.VUE_APP_MICRO_CONFIG_PREFIX_SERVICE; // 微应用前缀
  const project = process.cwd().split(path.sep).pop(); // 项目名称
  const name = project.split('-').pop(); // 微应用名称
  return `${prefix}/${name}/`;
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
  getPublicPath,
  resolveEnvs,
  isNumeric,
  getIPAdress,
};
