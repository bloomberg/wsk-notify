import test from 'ava';
var execa = require('execa');

var notify = require('../src/index');
var config = notify.config();

var expectedDisplayOutputs = require('./expected/expectedDisplayOutputs')(config.time);

var notifySettings = {
  message: 'msg',
  value: 'value',
  display: 'compile'
};

var example = JSON.stringify(notifySettings);
var exampleList = JSON.stringify([notifySettings, notifySettings]);

test.cb('piping single to cli', t => {
  execa.shell(`echo '${example}' | bin/wsk-notify`, {env: {FORCE_COLOR: true}}).then(result => {
    var actual = result.stdout;
    t.is(expectedDisplayOutputs['compile'], actual);
    t.end();
  });
});

test.cb('piping multiple to cli', t => {
  execa.shell(`echo '${exampleList}' | bin/wsk-notify`, {env: {FORCE_COLOR: true}}).then(result => {
    var actual = result.stdout;
    t.deepEqual([expectedDisplayOutputs['compile'], expectedDisplayOutputs['compile']].join('\n'), actual);
    t.end();
  });
});
