const path = require('path');
module.exports = {
  resolve(dir) {
    return path.resolve(process.cwd(), '.', dir);
  },
};
