/* --------------------------------------------
 * Convert our possibly user-defined project name to a string.
 * Accepts string or function
 */
var _ = require('underscore');

module.exports = function getProjectString (notifyrc, displaySettings, projectName) {
  var prjName = displaySettings.projectName || notifyrc.projectName;
  if (_.isFunction(prjName)) {
    return prjName(projectName);
  } else {
    return prjName;
  }
};
