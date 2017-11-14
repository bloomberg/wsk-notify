import test from 'ava';
import sinon from 'sinon';

var notify = require('../src/index');

var config = notify.config();
var expectedDisplayOutputs = require('./expected/expectedDisplayOutputs')(config.time);

test.beforeEach(t => {
  sinon.spy(console, 'error');
  sinon.spy(console, 'warn');
});

test.afterEach(t => {
  console.warn.restore();
  console.error.restore();
});

test.serial('error level notification', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: 'error'
  };
  notify(notifySettings);
  var actual = console.error.getCall(0).args[0];
  t.is(expectedDisplayOutputs['error'], actual);
  t.log(actual);
});

test.serial('warn level notification', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: 'warn'
  };
  notify(notifySettings);
  var actual = console.warn.getCall(0).args[0];
  t.is(expectedDisplayOutputs['warn'], actual);
  t.log(actual);
});

test.serial('warn level notification', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: 'compile',
    extend: {
      level: 'warn'
    }
  };
  notify(notifySettings);
  var actual = console.warn.getCall(0).args[0];
  t.is(expectedDisplayOutputs['compile'], actual);
  t.log(actual);
});
