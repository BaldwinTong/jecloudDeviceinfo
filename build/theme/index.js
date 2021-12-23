const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const { resolve } = require('../utils.js');
const utils = require('./utils.js');
const themes = utils.getThemes();

const themeMode = ['default', 'dark'];
const files = ['less'];
// 主题目录
const themeDir = resolve('service/common/assets/themes');
fs.mkdirSync(themeDir, { recursive: true });

// 生成主题文件
const ejsDir = 'build/theme/ejs';
files.forEach((type) => {
  // 主题风格
  themeMode.forEach((mode) => {
    // 读取模板数据
    const file = resolve(`${ejsDir}/${type}/${mode}.ejs`);
    const data = fs.readFileSync(file).toString();
    themes.forEach((theme) => {
      // 生成样式
      const content = ejs.render(data, theme.vars);
      // 生成文件
      const file = path.join(themeDir, `${theme.code}-${mode}.${type}`);
      fs.writeFile(file, content, function (error) {
        if (error) {
          console.log(error);
        }
        console.log('主题生成成功：', file);
      });
    });
  });
});

const file = path.join(themeDir, `theme.json`);
fs.writeFile(file, JSON.stringify(themes), function (error) {
  if (error) {
    console.log(error);
  }
  console.log('theme.json生成成功：', file);
});
