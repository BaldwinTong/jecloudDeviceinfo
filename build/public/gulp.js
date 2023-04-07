const gulp = require('gulp');
const merge = require('merge-stream');
const path = require('path');
const { resolve } = require('../utils');
const distDir = resolve('build/public/dist');

/**
 * webpack构建完成，复制资源完成
 */
gulp.task('copy-public', () => {
  return merge(
    gulp.src(path.join(distDir, '**/*')).pipe(gulp.dest(resolve('dist/static/styles'))),
    gulp.src(resolve('build/public/src/libs/**/*')).pipe(gulp.dest(resolve('dist/static/libs'))),
  );
});
