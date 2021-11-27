const fs = require('fs');
const path = require('path');
const {resolve} = require('./build/utils');
const libPrefix = 'jecloud';
const libs = ['@jecloud/ui','@jecloud/utils'];
// 增加开发依赖
function readPackage(pkg, context) {
  if (pkg.name.startsWith(libPrefix)) {
    libs.forEach((name)=>{
      const lib = pkg.dependencies[name];
      if(lib && lib.startsWith('file:.yalc')){
        const package = resolve(lib.replace('file:','')+'/package.json');
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
