import test from 'ava';

var notify = require('../src/index');
var _ = require('underscore');
var stripAnsi = require('strip-ansi');
var formatTimestamp = require('../src/utils/formatTimestamp');
notify.config('tests/.notifyrc-custom');

var customTime = '10:00:00.00';

var expectedCustomNotifyrcOutputs = require('./expected/expectedCustomNotifyrcOutputs')(customTime);

var notifySettings = {
  message: 'msg',
  value: 'value',
  display: 'compile',
  silent: true
};

// Run this first
test.serial('config from custom file path with projectName and time functions', t => {
  var actual = notify(notifySettings);
  t.is(expectedCustomNotifyrcOutputs['custom-notifyrc'], actual);
  t.log(actual);
});

test('user-defined config with projectName and time functions', t => {
  t.plan(2);
  var display = 'project-name-fn';
  var conf = {
    time: function (d) {
      t.is(_.isDate(d), true);
      return customTime;
    },
    projectName: function (projectName) {
      return 'wsk/custom-fn';
    }
  };
  notify.config(conf);
  var actual = notify(notifySettings);
  t.is(expectedCustomNotifyrcOutputs[display], actual);
  t.log(actual);
});

test('user-defined config with projectName string', t => {
  var display = 'project-name-str';
  var conf = {
    time: customTime,
    projectName: 'wsk/custom'
  };
  notify.config(conf);
  var actual = notify(notifySettings);
  t.is(expectedCustomNotifyrcOutputs[display], actual);
  t.log(actual);
});

test('user-defined config with formatted time should defer to properly formatted string', t => {
  t.plan(4);
  var conf = {
    time: formatTimestamp
  };
  notify.config(conf);
  var notification = notify(notifySettings);
  var parts = stripAnsi(notification)
    .replace('[', '')
    .split('|')[0]
    .trim()
    .split(':');

  t.log(notification);
  t.is(parts[0].length, 2, `hour should have length of 2: ${parts[0]}`);
  t.is(parts[1].length, 2, `minute should have length of 2: ${parts[1]}`);
  var secondsParts = parts[2].split('.');
  t.is(secondsParts[0].length, 2, `seconds should have length of 2: ${secondsParts[0]}`);
  t.is(secondsParts[1].length, 2, `deciseconds should have length of 2: ${secondsParts[1]}`);
});

test('user-defined config with null time should print `"null"`', t => {
  t.plan(1);
  var conf = {
    time: null
  };
  notify.config(conf);
  var notification = notify(notifySettings);
  var time = stripAnsi(notification)
    .replace('[', '')
    .split('|')[0]
    .trim();

  t.is(time, 'null', 'Timestamp should be `"null"`');
  t.log(notification);
});

test('user-defined config with custom prefix style', t => {
  var display = 'prefix-style';
  var conf = {
    time: customTime,
    projectName: 'wsk-notify',
    globalPrefixStyle: {
      open: '<',
      close: '>',
      sep: '🍰 ',
      timestampStyle: ['gray', 'underline'],
      projectNameStyle: 'yellow'
    }
  };
  notify.config(conf);
  var actual = notify(notifySettings);
  t.is(expectedCustomNotifyrcOutputs[display], actual);
  t.log(actual);
});
