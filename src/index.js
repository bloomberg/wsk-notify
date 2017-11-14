/* --------------------------------------------
 *
 * Notify the user of events
 *
 * --------------------------------------------
 */
var _ = require('underscore');
var notifier = require('node-notifier');
var cS = require('clean-stack');
var stripAnsi = require('strip-ansi');

var defaultConfigPath = '.notifyrc';
var defaultNotifyrc = require('./defaults/defaultNotifyrc');
var loadNotifyrc = require('./lib/loadNotifyrc')(defaultConfigPath, defaultNotifyrc);
var notifyrc = loadNotifyrc();

var applyChalkStyles = require('./lib/applyChalkStyles');
var constructPrefix = require('./lib/constructPrefix');
var normalizeValue = require('./lib/normalizeValue');
var projectName = require('./lib/getProjectName');
var getProjectString = require('./lib/getProjectString');
var grabObject = require('./lib/grabObject');
var print = require('./lib/print');
var fillAliases = require('./lib/fillAliases');
var getDisplaySettings = require('./lib/getDisplaySettings');
var handleInternalError = require('./lib/handleInternalError');

var group = require('./group');
var clock = require('./clock');

var defaultNotificationSettings = require('./defaults/defaultNotificationSettings');

/* --------------------------------------------
 * Our main function
 */
function notify (userInput) {
  if (!userInput) return;
  var userList = _.isArray(userInput) ? userInput : [userInput];
  var notices = userList.map(forEachNotification);
  if (notices.length === 1) {
    return notices[0];
  }
  return notices;
}

function forEachNotification (userNotificationSettings) {
  var notificationSettings = _.extend({}, defaultNotificationSettings, fillAliases(userNotificationSettings));

  // What display are we using?
  var displaySettings = getDisplaySettings(notifyrc, notificationSettings);
  if (displaySettings.error) {
    return handleInternalError(displaySettings.error, notificationSettings.silent, forEachNotification);
  }

  // Normalize json objects, numbers and falsey values
  var normalizedMsg = normalizeValue(notificationSettings.message);
  var normalizedValue = normalizeValue(notificationSettings.value);
  var normalizedErr = notificationSettings.error ? '\n' + cS(notificationSettings.error.stack, {pretty: true}) : '';

  // Set our prefix, if we have one
  var prefix = constructPrefix(notifyrc, displaySettings);

  // If we are supposed to follow this with a string, normalize that here
  var postSuffix = displaySettings.postString || '';

  // Apply our styles, with some error checking
  var styledMsg = applyChalkStyles(normalizedMsg, displaySettings.messageStyle);
  if (_.isObject(styledMsg) && _.isObject(styledMsg.error)) {
    return handleInternalError(styledMsg.error, notificationSettings.silent, forEachNotification);
  }
  var styledValue = applyChalkStyles(normalizedValue, displaySettings.valueStyle);
  if (_.isObject(styledValue) && _.isObject(styledValue.error)) {
    return handleInternalError(styledValue.error, notificationSettings.silent, forEachNotification);
  }

  // Combine these two with a single space. If one is empty, the space will not be placed
  var msgValueCombo = [styledMsg, styledValue].filter(d => d).join(' ');

  var notification = prefix + msgValueCombo + postSuffix + normalizedErr;

  if (displaySettings.desktop === true || _.isObject(displaySettings.desktop) === true) {
    notifier.notify(_.extend({
      title: getProjectString(notifyrc, displaySettings, projectName),
      subtitle: stripAnsi(normalizedMsg),
      message: stripAnsi(normalizedValue || ' '),
      icon: './src/wsk-notify.gif'
    },
    grabObject(notifyrc, 'desktop'),
    grabObject(displaySettings, 'desktop'),
    grabObject(notificationSettings, 'desktop')
    ));
  }

  // Send it out.
  return print(notification, displaySettings.level, notificationSettings.silent);
}

notify.config = function (__) {
  if (typeof __ === 'undefined') {
    return notifyrc;
  }
  notifyrc = loadNotifyrc(__);
  return notify;
};

notify.group = function (__) {
  return group(notify).add(__);
};

notify.clock = clock;

/* --------------------------------------------
 * Export our public function
 */
module.exports = notify;
