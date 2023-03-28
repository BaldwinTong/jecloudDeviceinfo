const fs = require('fs');
const path = require('path');
const { resolve } = require('../utils');
const distDir = resolve('build/public/dist');
const publicConfig = require('./src/config');
const publicLibsConfig = publicConfig.libs;
const hashFile = path.join(distDir, 'hash.json');
/**
 * 构建dist样式文件的hash.json
 */
const buildDistCssHash = function () {
  const hashJson = {};
  // 重命名文件，方便移动端调用
  const files = fs.readdirSync(distDir);
  files
    .filter((item) => item.endsWith('.css'))
    .forEach((item) => {
      // 生成hash参数，方便移动端调用
      const splitArr = item.split('.');
      const hash = splitArr.splice(splitArr.length - 2, 1)[0];
      const file = splitArr.join('.');
      hashJson[file] = hash;
      fs.renameSync(path.join(distDir, item), path.join(distDir, file));
    });
  fs.writeFileSync(hashFile, JSON.stringify(hashJson));
  console.log('css hash.json生成成功！');
};
/**
 * 解析dist样式文件的hash.json
 * @returns
 */
const parseDistCssHash = function () {
  const files = fs.readdirSync(distDir);
  let styles = files.filter((file) => file.endsWith('.css'));
  const hashJson = JSON.parse(fs.readFileSync(hashFile));
  // 生成hash参数，方便移动端调用
  return styles.map((file) => `${file}?v=${hashJson[file]}`);
};

/**
 * 构建静态资源html标签
 * @param {*} envs
 * @returns
 */
const buildHtmlTags = function (envs) {
  const { PUBLIC_PATH } = envs;
  // 处理libs
  let libs = [];
  const libTpl = `<script src="${PUBLIC_PATH}static/libs/{file}"></script>`;
  publicLibsConfig.forEach((lib) => {
    if (lib.files) {
      lib.files.forEach((file) => {
        libs.push(`${lib.lib}/${lib.version}/${file}`);
      });
    } else {
      libs.push(`${lib.lib}/${lib.version}/min.js`);
    }
  });
  libs = libs.map((file) => libTpl.replace('{file}', file));

  // 处理styles
  const styleTpl = `<link href="${PUBLIC_PATH}static/styles/{file}" rel="stylesheet" exclude></link>`;
  const styles = parseDistCssHash().map((style) => styleTpl.replace('{file}', style));
  return { libs, styles };
};
/**
 * 排除静态资源包
 * @returns
 */
const buildExternals = function () {
  const externals = {}; // 外部工具类
  publicLibsConfig.forEach((item) => {
    if (typeof item.externals == 'string') {
      externals[item.lib] = item.externals;
    } else {
      Object.assign(externals, item.externals);
    }
  });
  return externals;
};

module.exports = { buildHtmlTags, buildExternals, buildDistCssHash, parseDistCssHash };
