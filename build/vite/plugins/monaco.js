import monacoEditorPlugin from './vite-plugin-monaco-editor';
/**
 * ejs html模板
 *
 * @export
 * @param {*} envs
 * @return {*}
 */
export function configMonacoPlugin(envs) {
  return monacoEditorPlugin({
    base: envs.PUBLIC_PATH,
    languageWorkers: ['editorWorkerService', 'typescript', 'css'],
  });
}
