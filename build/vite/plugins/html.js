import html from 'vite-plugin-html';
/**
 * ejs html模板
 *
 * @export
 * @param {*} envs
 * @return {*}
 */
export default function (envs) {
  const { VUE_APP_SERVE_PROXY_PREFIX, VUE_APP_HTML_TITLE, VUE_APP_HTML_ICON } = envs;
  return html({
    inject: {
      data: {
        title: 'vite-plugin-html-example',
        injectScript: `
        <script>
          var __JECLI_ENVS__={
            APP_HTML_TITLE:'${VUE_APP_HTML_TITLE}',
            APP_HTML_ICON:'${VUE_APP_HTML_ICON}',
            APP_CLI:'VITE',
            APP_SERVE_PROXY_PREFIX:'${VUE_APP_SERVE_PROXY_PREFIX}'
          }
        </script>
        `,
      },
    },
    minify: true,
  });
}
