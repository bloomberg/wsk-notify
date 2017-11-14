var path = require('path');
var _ = require('underscore');
var grabObject = require('./grabObject');

module.exports = function loadNotifyrc (defaultConfigPath, defaultNotifyrc) {
  return function (__) {
    var userNotifyrc;
    __ = __ || defaultConfigPath;
    try {
      if (typeof __ === 'string') {
        userNotifyrc = require(path.join(path.resolve('./'), __));
      } else {
        userNotifyrc = __ || {};
      }
    } catch (err) {
      // Different versions of node seem to report this error differently
      if ((err.code = 'MODULE_NOT_FOUND' || err.code === 'ENOENT') && __ === defaultConfigPath) {
        // There isn't a .notifyrc file, which is fine, we'll proceed without it
        userNotifyrc = {};
      } else {
        throw new Error(err);
      }
    }
    // Allow for partial settings on these keys
    var defaultDisplaySettings = _.extend({},
      defaultNotifyrc.defaultDisplaySettings,
      userNotifyrc.defaultDisplaySettings
    );
    var globalPrefixStyle = _.extend({},
      defaultNotifyrc.globalPrefixStyle,
      userNotifyrc.globalPrefixStyle
    );

    var notifyrc = _.extend({}, defaultNotifyrc, userNotifyrc, {
      globalPrefixStyle: globalPrefixStyle,
      defaultDisplaySettings: defaultDisplaySettings
    });
    notifyrc.allDisplays = _.extend({},
      defaultNotifyrc.defaultDisplays,
      grabObject(userNotifyrc, 'customDisplays')
    );
    return notifyrc;
  };
};
