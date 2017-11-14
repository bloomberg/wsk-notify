var _ = require('underscore');
var chalk = require('chalk');
var grabObject = require('./grabObject');

module.exports = function getDisplaySettings (notifyrc, notificationSettings) {
  var displayVal = notificationSettings.display;

  var displayObject;
  if (_.isString(displayVal) && notifyrc.allDisplays[displayVal]) {
    if (_.isString(notifyrc.allDisplays[displayVal]) || _.isArray(notifyrc.allDisplays[displayVal])) {
      displayObject = {
        messageStyle: notifyrc.allDisplays[displayVal]
      };
    } else {
      displayObject = notifyrc.allDisplays[displayVal];
    }
  } else if ((_.isString(displayVal) && chalk[displayVal]) || _.isArray(displayVal)) {
    displayObject = {
      messageStyle: displayVal
    };
  } else if (_.isString(displayVal) && displayVal && !notifyrc.allDisplays[displayVal]) {
    return {
      error: {
        message: 'Error: Given display name ' + chalk.bold('`' + displayVal + '`') + ' has no corresponding display style. Supported displays are:',
        value: Object.keys(notifyrc.allDisplays).join(','),
        display: 'error'
      }
    };
  } else if (_.isObject(displayVal)) {
    displayObject = displayVal;
  } else {
    displayObject = {};
  }
  return _.extend({}, notifyrc.defaultDisplaySettings, displayObject, grabObject(notificationSettings, 'extend'));
};
