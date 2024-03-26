import html from 'vite-plugin-html';
/**
 * ejs html模板
 *
 * @export
 * @param {*} envs
 * @return {*}
 */
export function configHtmlPlugin(envs, command) {
  return html({
    inject: {
      data: {
        title: envs.VUE_APP_HTML_TITLE,
      },
    },
    minify: true,
  });
}
