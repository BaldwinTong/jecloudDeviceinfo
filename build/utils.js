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
  resolveEnvs,
  isNumeric,
  getIPAdress,
};
