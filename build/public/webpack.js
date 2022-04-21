const webpack = require('webpack');
const path = require('path');
const del = require('del');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getLess } = require('@zougt/some-loader-utils');
const { resolve } = require('../utils');
const { lessVars } = require('../theme/config');
const rootDir = resolve('build/public');
const distDir = path.join(rootDir, 'dist');

// 单独打包样式
const entrys = {
  'ant-design-vue': `${rootDir}/src/theme/ant-design-vue.js`,
  'jecloud-ui': `${rootDir}/src/theme/jecloud-ui.js`,
  icons: `${rootDir}/src/icons.js`,
};

console.log('开始构建公共资源');
// 打包主题文件，依赖webpack插件
webpack(
  {
    entry: entrys, // 入口，表示要使用webpack打包哪个文件
    output: {
      // 出口
      path: distDir,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                paths: [resolve('node_modules')],
                javascriptEnabled: true, //允许链式调用的换行
                implementation: getLess({
                  getMultipleScopeVars: () => {
                    return lessVars;
                  },
                }),
              },
            },
          ],
        },
        {
          test: /\.(eot|woff|woff2?|ttf|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[contenthash:8].[ext]',
                outputPath: 'fonts',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new OptimizeCSSAssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
    ],
  },
  () => {
    // 删除无用文件
    del([path.join(distDir, '*.js'), path.join(distDir, '*.json')]);
    console.log(`公共资源构建成功`);
  },
);
