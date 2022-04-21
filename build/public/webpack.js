const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getLess } = require('@zougt/some-loader-utils');
const ThemeCssExtractWebpackPlugin = require('@zougt/theme-css-extract-webpack-plugin');
const { exec } = require('child_process');
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

// 打包主题文件，依赖webpack插件
webpack(
  {
    entry: entrys, // 入口，表示要使用webpack打包哪个文件
    output: {
      // 出口
      path: distDir,
      filename: '[name].js',
    },
    // context: resolve('.'),
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
      ...Object.keys(entrys).map(
        (key) => new HtmlWebpackPlugin({ filename: key + '.html', chunks: [key] }),
      ),
      new MiniCssExtractPlugin({
        // filename: '[name].[contenthash:8].css',
        filename: '[name].css',
      }),
      new ThemeCssExtractWebpackPlugin({
        multipleScopeVars: lessVars,
        extract: true,
      }),
    ],
  },
  () => {
    // 生成文件hash，清除无用文件
    exec('gulp build-css-hash', (error) => {
      if (error) {
        console.error(`执行出错: ${error}`);
        return;
      }
      console.log(`公共资源构建成功`);
    });
  },
);
