const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const utils = require('./utils.js');

const themeMode = ['default', 'dark'];
const files = ['less'];

// 主题目录
const themeDir = path.resolve(__dirname, '../../../', 'src/assets/themes');
const cssDir = path.join(themeDir);
files.forEach((type) => {
  // 生成目录
  fs.mkdirSync(cssDir, { recursive: true });

  // 主题风格
  themeMode.forEach((mode) => {
    // 读取模板数据
    const file = path.resolve(__dirname, '.', `${type}/${mode}.ejs`);
    const data = fs.readFileSync(file).toString();
    utils.themes.forEach((theme) => {
      // 获取颜色值
      // const colors = utils.generateAntColors(theme.color, mode);
      // 生成样式
      const content = ejs.render(data, { primaryColor: theme.color });
      // 生成文件
      const file = path.join(cssDir, `${theme.code}-${mode}.${type}`);
      fs.writeFile(file, content, function (error) {
        if (error) {
          console.log(error);
        }
        console.log('主题生成成功：', file);
      });
    });
  });
});
