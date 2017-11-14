import test from 'ava';

delete require.cache[require.resolve('../src/index')];
var notify = require('../src/index');

var expected = {
  chalkError: '[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[31mError: Invalid chalk style...\u001b[39m \u001b[1mbad-style\u001b[22m'
};

test('a bad chalk display style will give us an error message', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: ['bad-style'],
    silent: true
  };

  var actual = notify(notifySettings);
  t.is(expected['chalkError'], actual);
  t.log(actual);
});

test('a bad chalk messageStyle  will give us an error message', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: {
      messageStyle: 'bad-style'
    },
    silent: true
  };

  var actual = notify(notifySettings);
  t.is(expected['chalkError'], actual);
  t.log(actual);
});

test('a bad chalk valueStyle  will give us an error message', t => {
  var notifySettings = {
    message: 'msg',
    value: 'value',
    display: {
      valueStyle: 'bad-style'
    },
    silent: true
  };

  var actual = notify(notifySettings);
  t.is(expected['chalkError'], actual);
  t.log(actual);
});
