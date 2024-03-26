import vue from '@jecloud/vue';
export default function vuePlugin() {
  return {
    transform(code, file) {
      return { code: vue.transformVue(code, file) };
    },
  };
}
