import test from 'ava';

// Remove the cached version so it doesn't use the custom notifyrc we're using for those tests
delete require.cache[require.resolve('../src/index')];
var notify = require('../src/index');
var cleanStack = require('clean-stack');
var _ = require('underscore');

var config = notify.config();

var expectedDisplayOutputs = require('./expected/expectedDisplayOutputs')(config.time);
var expectedCustomDisplayOutputs = require('./expected/expectedCustomDisplayOutputs')(config.time);

var notifySettings = {
  message: 'msg',
  value: 'value',
  silent: true
};

Object.keys(expectedDisplayOutputs).forEach(function (display) {
  test(`built-in display "${display}" with existing .notifyrc file`, t => {
    var settings = _.extend({}, notifySettings, {display: display});
    var actual = notify(settings);
    t.is(expectedDisplayOutputs[settings.display], actual);
    t.log(actual);
  });
});

test('skip prefix', t => {
  var display = 'compile';
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: display,
    silent: true,
    extend: {
      skipPrefix: true
    }
  };
  var expected = expectedDisplayOutputs[display].split('] ')[1];
  var actual = notify(notifySettings);
  t.is(expected, actual);
  t.log(actual);
});

test('with message:5 and value:false', t => {
  var display = 'compile';
  var notifySettings = {
    message: 5,
    value: false,
    display: display,
    silent: true
  };

  var expected = expectedDisplayOutputs[display]
    .replace('msg', '5')
    .replace('value', 'false');

  var actual = notify(notifySettings);
  t.is(expected, actual);
  t.log(actual);
});

test('passing an error object', t => {
  var display = 'compile';
  var error = new Error('error message');
  var notifySettings = {
    message: 'msg',
    display: display,
    error: error,
    silent: true
  };
  var expected = expectedCustomDisplayOutputs['no-value'] + '\n' + cleanStack(error.stack, {pretty: true});
  var actual = notify(notifySettings);
  t.is(expected, actual);
  t.log(actual);
});

test('with message:json and value:true', t => {
  var display = 'compile';
  var notifySettings = {
    message: {name: 'hello'},
    value: true,
    display: display,
    silent: true
  };
  var expected = expectedDisplayOutputs[display]
    .replace('msg', JSON.stringify(notifySettings.message))
    .replace('value', 'true');
  var actual = notify(notifySettings);
  t.is(expected, actual);
  t.log(actual);
});

test('with message:"" and value:NaN', t => {
  var display = 'compile';
  var notifySettings = {
    message: '',
    value: NaN,
    display: display,
    silent: true
  };
  var expected = expectedCustomDisplayOutputs['no-msg']
    .replace('value', 'NaN');
  var actual = notify(notifySettings);
  t.is(expected, actual);
  t.log(actual);
});

test('with message:null and value:undefined', t => {
  var display = 'compile';
  var notifySettings = {
    message: null,
    display: display,
    silent: true
  };
  var expected = expectedCustomDisplayOutputs['no-value']
    .replace('msg', 'null');
  var actual = notify(notifySettings);
  t.is(expected, actual);
  t.log(actual);
});

test('shorthand', t => {
  var error = new Error('error message');
  var notifySettings = {
    m: 'msg',
    v: 'value',
    d: 'compile',
    s: true,
    e: error,
    x: {
      desktop: {
        wait: true
      }
    }
  };

  var expected = expectedDisplayOutputs['compile'] + '\n' + cleanStack(error.stack, {pretty: true});
  var actual = notify(notifySettings);
  t.is(expected, actual);
  t.log(actual);
});

test('no display', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    silent: true
  };

  var actual = notify(notifySettings);
  t.is(expectedDisplayOutputs['default'], actual);
  t.log(actual);
});

test('no message', t => {
  var display = 'compile';
  var notifySettings = {
    value: 'value',
    display: display,
    silent: true
  };

  var actual = notify(notifySettings);
  t.is(expectedCustomDisplayOutputs['no-msg'], actual);
  t.log(actual);
});

test('no value', t => {
  var display = 'compile';
  var notifySettings = {
    message: 'msg',
    display: display,
    silent: true
  };

  var actual = notify(notifySettings);
  t.is(expectedCustomDisplayOutputs['no-value'], actual);
  t.log(actual);
});

test('inline messageStyle: underline, cyan', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: {
      messageStyle: ['underline', 'cyan']
    },
    silent: true
  };
  var actual = notify(notifySettings);
  t.is(expectedCustomDisplayOutputs['inline-1'], actual);
  t.log(actual);
});

test('inline display: underline, cyan', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: ['underline', 'cyan'],
    silent: true
  };
  var actual = notify(notifySettings);
  t.is(expectedCustomDisplayOutputs['inline-1'], actual);
  t.log(actual);
});

test('inline display: underline, cyan', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: 'underline',
    silent: true
  };
  var actual = notify(notifySettings);
  t.is(expectedCustomDisplayOutputs['inline-2'], actual);
  t.log(actual);
});

test('named display from .notifyrc', t => {
  var display = 'custom-name';
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: display,
    silent: true
  };
  var actual = notify(notifySettings);
  t.is(expectedCustomDisplayOutputs['custom-name'], actual);
  t.log(actual);
});
