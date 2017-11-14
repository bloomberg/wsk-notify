var path = require('path');

module.exports = function getProjectName () {
  var basePath = path.resolve('./');
  return path.basename(basePath);
};
