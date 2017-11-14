import test from 'ava';

// Remove the cached version so it doesn't use the custom notifyrc we're using for those tests
delete require.cache[require.resolve('../src/index')];
var notify = require('../src/index');

var config = notify.config();
var expectedDisplayOutputs = require('./expected/expectedDisplayOutputs')(config.time);

expectedDisplayOutputs.multiple = [expectedDisplayOutputs.compile, expectedDisplayOutputs.default];

var display = 'compile';
var display2 = 'default';
var notifySettings = [{
  message: 'msg',
  value: 'value',
  display: display,
  silent: true
}, {
  message: 'msg',
  value: 'value',
  display: display2,
  silent: true
}];

test('multiple notifications with groups', t => {
  var actual = notify(notifySettings);
  t.deepEqual(expectedDisplayOutputs['multiple'], actual);
  t.log(actual);
});

test('instantiate group with a notification', t => {
  var group = notify.group(notifySettings[0]);
  group.add(notifySettings[1]);

  var actual = group.notify({silent: true});
  t.deepEqual(expectedDisplayOutputs['multiple'], actual);
  t.log(actual);
});

test('instantiate empty group', t => {
  var group = notify.group();
  group.add(notifySettings[0]);
  group.add(notifySettings[1]);

  var actual = group.notify({silent: true});
  t.deepEqual(expectedDisplayOutputs['multiple'], actual);
  t.log(actual);
});

test('return a list via .list', t => {
  var group = notify.group();
  group.add(notifySettings[0]);
  group.add(notifySettings[1]);

  var actual = group.list();
  t.deepEqual(expectedDisplayOutputs['multiple'], actual);
  t.log(actual);
});

test('return a list from passing a list of objects', t => {
  var group = notify.group();
  group.add(notifySettings[0]);
  group.add(notifySettings[1]);

  var actual = group.notify({silent: true});
  t.deepEqual(expectedDisplayOutputs['multiple'], actual);
  t.log(actual);
});
