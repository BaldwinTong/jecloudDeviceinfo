/**
 * 多页面配置
 */
module.exports = {
  entrys: [{ name: 'index', entry: 'src/main.js', template: `public/index.html` }],
  config(envs) {
    const {
      VUE_APP_HTML_TITLE, // 首页标题
      VUE_APP_AJAX_BASE_URL, // ajax基础请求
      VUE_APP_VERSION,
    } = envs;
    const pages = {};
    this.entrys.forEach(({ name, entry, template }) => {
      pages[name] = {
        title: VUE_APP_HTML_TITLE, // 标题
        ajaxBaseUrl: VUE_APP_AJAX_BASE_URL, //ajax基础请求
        version: VUE_APP_VERSION,
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
