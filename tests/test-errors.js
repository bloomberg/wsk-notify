import test from 'ava';

delete require.cache[require.resolve('../src/index')];
var fs = require('fs');
var path = require('path');
var notify = require('../src/index');

var expected = {
  noDefault: '\u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[31mError: Given display name \u001b[1m`custom-name`\u001b[22m has no corresponding display style. Supported displays are:\u001b[39m \u001b[1mdefault,compile,watch,error,warn,change,add,reload,success,remove,serve\u001b[22m'
};

test('no default .notifyrc shows an error that `custom-name` is not found', t => {
  delete require.cache[path.join(path.resolve('./'), '.notifyrc')];
  fs.renameSync('./.notifyrc', './.hidden');
  notify.config('.notifyrc');
  fs.renameSync('./.hidden', './.notifyrc');
  var settings = {
    message: 'msg',
    value: 'value',
    display: 'custom-name',
    silent: true
  };
  var actual = notify(settings).split('| ')[1];
  t.is(expected.noDefault, actual);
  t.log(actual);
});

test('load a config that does not exist', t => {
  const error = t.throws(() => {
    notify.config('does/not/exist.js');
  });
  t.regex(error.message, /Cannot find module/);
});

test('passing in nothing is undefined', t => {
  t.is(notify(), undefined);
});
