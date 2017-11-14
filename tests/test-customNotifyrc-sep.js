import test from 'ava';

// Remove the cached version so it doesn't use the custom notifyrc we're using for those tests
delete require.cache[require.resolve('../src/index')];
var notify = require('../src/index');
var _ = require('underscore');
notify.config('tests/.notifyrc-custom-sep');

var config = notify.config();

var expectedCustomDisplayOutputs = require('./expected/expectedDisplayOutputsNotifyrcCustomSep')(config.time());

var notifySettings = {
  message: 'msg',
  value: 'value',
  silent: true
};

Object.keys(expectedCustomDisplayOutputs).forEach(function (display) {
  test(`built-in display "${display}" with .notifyrc-custom-sep file`, t => {
    var settings = _.extend({}, notifySettings, {display: display});
    var actual = notify(settings);
    t.is(expectedCustomDisplayOutputs[settings.display], actual);
    t.log(actual);
  });
});
