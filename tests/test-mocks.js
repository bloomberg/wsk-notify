import test from 'ava';
import sinon from 'sinon';

var notify = require('../src/index');

var config = notify.config();
var expectedDisplayOutputs = require('./expected/expectedDisplayOutputs')(config.time);

test.beforeEach(t => {
  sinon.spy(console, 'log');
});

test.afterEach(t => {
  console.log.restore();
});

test.serial('non-silent notification', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: 'compile'
  };
  notify(notifySettings);
  var actual = console.log.getCall(0).args[0];
  t.is(expectedDisplayOutputs['compile'], actual);
  t.log(actual);
});

test.serial('non-silent group notification', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: 'compile'
  };
  var group = notify.group(notifySettings);
  group.notify();
  var actual = console.log.getCall(0).args[0];
  t.is(expectedDisplayOutputs['compile'], actual);
  t.log(actual);
});

test.serial('non-silent group notification with silent:false', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: 'compile'
  };
  var group = notify.group(notifySettings);
  group.notify({silent: false});
  var actual = console.log.getCall(0).args[0];
  t.is(expectedDisplayOutputs['compile'], actual);
  t.log(actual);
});
