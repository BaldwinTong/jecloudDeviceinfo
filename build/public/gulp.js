const gulp = require('gulp');
const merge = require('merge-stream');
const fs = require('fs');
const path = require('path');
const rev = require('gulp-rev');
const del = require('del');
const cleancss = require('gulp-clean-css');
const { resolve } = require('../utils');
const distDir = resolve('build/public/dist');
const publicConfig = require('./src/config');
const publicLibsConfig = publicConfig.libs;
const publicStylesConfig = publicConfig.styles;

/**
 * webpack构建完成，复制资源完成
 */
gulp.task('copy-public', () => {
  return merge(
    gulp.src(path.join(distDir, '**/*')).pipe(gulp.dest(resolve('dist/static/styles'))),
    gulp.src(resolve('build/public/src/libs/**/*')).pipe(gulp.dest(resolve('dist/static/libs'))),
  );
});

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
  let styles = [];
  const styleTpl = `<link href="${PUBLIC_PATH}static/styles/{file}" rel="stylesheet" exclude></link>`;
  const files = fs.readdirSync(distDir);
  publicStylesConfig.forEach((lib) => {
    styles.push(...files.filter((fileName) => fileName.startsWith(lib)));
  });
  styles = styles.map((file) => styleTpl.replace('{file}', file));

  // console.log(libs, styles);

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

module.exports = { buildHtmlTags, buildExternals };

/**
 * 构建css文件hash
 * 废弃
 */
gulp.task('build-css-hash', () => {
  const jsonFile = 'styles.json';
  return gulp
    .src([path.join(distDir, '*.css')])
    .pipe(cleancss())
    .pipe(rev())
    .pipe(gulp.dest(distDir))
    .pipe(rev.manifest(jsonFile))
    .pipe(gulp.dest(distDir))
    .on('end', () => {
      const files = JSON.parse(fs.readFileSync(path.join(distDir, jsonFile)));
      // 删除无用文件
      const folders = [
        path.join(distDir, '*.js'),
        path.join(distDir, '*.json'),
        ...Object.keys(files).map((name) => path.join(distDir, name)),
      ];
      del(folders).then((...args) => {
        console.log(args);
      });
    });
});
