var _ = require('underscore');

module.exports = function (obj, key) {
  return _.isObject(obj[key]) === true && _.isArray(obj[key]) === false ? obj[key] : {};
};
