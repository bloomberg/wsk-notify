/* --------------------------------------------
 * Normalize what we pass as the message and value strings
 */
var _ = require('underscore');

module.exports = function normalizeValue (val) {
  // Simple stringify numbers
  if (_.isNumber(val)) {
    return String(val);
  // Pretty print objects (arrays, dates, dictionaries, errors) and booleans
  } else if (typeof val === 'object' || _.isBoolean(val)) {
    return JSON.stringify(val);
  } else {
    return val;
  }
};
