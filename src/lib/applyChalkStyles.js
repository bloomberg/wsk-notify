/* --------------------------------------------
 * A function that will take a string or list of strings that are chalk styles and apply them to a string
 */
var chalk = require('chalk');
var _ = require('underscore');

module.exports = function applyChalkStyles (str, styles) {
  // Convert our styles preferences to an array if it isn't one
  // Later we can then more simply treat this always an array, even if it's just an array of one
  if (!_.isArray(styles)) {
    styles = [styles];
  }
  var error = false;
  // Apply our styles
  styles.forEach(function (style) {
    if (chalk[style]) {
      str = chalk[style](str);
    } else if (style && style.trim()) {
      error = {
        message: 'Error: Invalid chalk style...',
        value: style,
        display: 'error'
      };
    }
  });

  return error !== false ? {error} : str;
};
