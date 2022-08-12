const fs = require('fs');
const {resolve} = require('./build/utils');
const libPrefix = 'jecloud';
// 增加开发依赖
function readPackage(pkg, context) {
  if (pkg.name.startsWith(libPrefix)) {
    Object.keys(pkg.dependencies).forEach((lib)=>{
      if(lib.startsWith('@jecloud/')){
        const package = resolve(`.yalc/${lib}/package.json`);
        const data = JSON.parse(fs.readFileSync(package).toString());
        pkg.dependencies = Object.assign(data.dependencies,pkg.dependencies);
      }
    })
  }
  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
