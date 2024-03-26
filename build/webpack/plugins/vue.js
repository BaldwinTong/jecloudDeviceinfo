const vue = require('@jecloud/vue');
module.exports = function (source) {
  return vue.transformVue(source, this.resourcePath);
};
