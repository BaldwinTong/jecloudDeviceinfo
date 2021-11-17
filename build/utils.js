const path = require('path');

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
};
