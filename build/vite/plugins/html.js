import html from 'vite-plugin-html';
/**
 * ejs html模板
 *
 * @export
 * @param {*} envs
 * @return {*}
 */
export default function (envs) {
  return html({
    inject: {
      data: {
        title: 'vite-plugin-html-example',
        injectScript: `
        <script>
          var __CLI_ENVS__= ${JSON.stringify(envs)}
        </script>
        `,
      },
    },
    minify: true,
  });
}
