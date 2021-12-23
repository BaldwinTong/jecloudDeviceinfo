/**
 * 多页面配置
 */
module.exports = {
  entrys: [
    { name: 'index', entry: 'src/main.js', template: `public/index.html` },
    'demo',
    'main',
    'icons',
    'func',
  ],
  config(envs) {
    const {
      VUE_APP_HTML_TITLE, // 首页标题
    } = envs;
    const pages = {};
    this.entrys.forEach((item) => {
      const name = item.name || item;
      const entry = item.entry || `service/micro/apps/${item}/main.js`;
      const template = item.template || `build/webpack/pages/${name}.html`;
      pages[name] = {
        title: VUE_APP_HTML_TITLE, // 标题
        // page 的入口
        entry,
        // 模板来源
        template: template,
        // 在 dist/index.html 的输出
        filename: `${name}.html`,
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', name],
      };
    });
    return {
      pages: pages,
    };
  },
};
