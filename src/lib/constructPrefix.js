/* --------------------------------------------
 *
 * Create the timestamp and project dir portion of the notification
 * This will add any line breaks if they are designated in the display
 * --------------------------------------------
 */
var _ = require('underscore');
var getProjectName = require('./getProjectName');
var getProjectString = require('./getProjectString');
var applyChalkStyles = require('./applyChalkStyles');
var grabObject = require('./grabObject');

module.exports = function constructPrefix (notifyrc, displaySettings) {
  var returnVal = '';
  if (_.isString(displaySettings.preString) && displaySettings.preString) {
    returnVal = displaySettings.preString;
  }
  // Skip if we're skipping, setting it in the notification preferences overrides a display preference
  if (displaySettings.skipPrefix === true) {
    return returnVal;
  }

  // Extend our bracket style with anything custom, display styles override globals
  var prefixStyle = _.extend(
    {},
    grabObject(notifyrc, 'globalPrefixStyle'),
    grabObject(displaySettings, 'prefixStyle')
  );

  var d = new Date();
  var time;

  var customTime = notifyrc.time;
  if (_.isFunction(customTime)) {
    time = customTime(d);
  } else {
    time = typeof customTime === 'string' ? customTime : String(customTime);
  }

  var prjString = getProjectString(notifyrc, displaySettings, getProjectName());
  returnVal += prefixStyle.open + applyChalkStyles(time, prefixStyle.timestampStyle) + ' ' + prefixStyle.sep + ' ' + applyChalkStyles(prjString, prefixStyle.projectNameStyle) + prefixStyle.close;

  return returnVal + ' ';
};
