import monacoEditorPlugin from 'vite-plugin-monaco-editor';
/**
 * ejs html模板
 *
 * @export
 * @param {*} envs
 * @return {*}
 */
export function configMonacoPlugin() {
  return monacoEditorPlugin({
    languageWorkers: ['editorWorkerService', 'typescript', 'css'],
  });
}
