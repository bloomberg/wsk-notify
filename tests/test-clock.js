import test from 'ava';
var notify = require('../src/index');
var formatTime = require('../src/utils/formatTime');

test.cb('clock - raw', t => {
  t.plan(2);
  var startTime = notify.clock();
  setTimeout(function () {
    var time = notify.clock(startTime, {raw: true});
    t.true(time > 1, 'should be above 1ms: ' + time);
    t.true(time < 200, 'should be below 200ms: ' + time);
    t.end();
  }, 5);
});

test.cb('clock - formatted in milliseconds', t => {
  var startTime = notify.clock();
  var start = 1;
  var end = 200;
  var vals = [];
  for (var i = start; i <= end; i++) {
    vals.push(i + 'ms');
  }
  setTimeout(function () {
    var time = notify.clock(startTime);
    t.true(vals.indexOf(time) > -1, 'array should contain value: ' + time);
    t.end();
  }, 5);
});

var timesToTest = [
  {raw: 0, formatted: '0ms'},
  {raw: 0.1 * 0.2, formatted: '0ms'},
  {raw: 2, formatted: '2ms'},
  {raw: 20, formatted: '20ms'},
  {raw: 20.4, formatted: '20.4ms'},
  {raw: 20.5, formatted: '20.5ms'},
  {raw: 20.6, formatted: '20.6ms'},
  {raw: 60.020000000000000004, formatted: '60ms'},
  {raw: 60.1, formatted: '60.1ms'},
  {raw: 1500, formatted: '1.5s'},
  {raw: 1750, formatted: '1.75s'},
  {raw: 40000, formatted: '40s'},
  {raw: 40500, formatted: '40.5s'},
  {raw: 40750, formatted: '40.75s'},
  {raw: 60000, formatted: '1m'},
  {raw: 61000, formatted: '1m 1s'},
  {raw: 61750, formatted: '1m 1s'},
  {raw: 10 * 60 * 1000, formatted: '10m'},
  {raw: 60 * 1000 * 10 + 500, formatted: '10m'},
  {raw: 60 * 1000 * 10 + 1600, formatted: '10m 1s'},
  {raw: 51 * 60 * 1000 + 40 * 1000, formatted: '51m 40s'},
  {raw: 59 * 60 * 1000 + 59 * 1000, formatted: '59m 59s'},
  {raw: 60 * 60 * 1000 + 59 * 1000, formatted: '1h 59s'},
  {raw: 2 * 60 * 60 * 1000 + 30 * 1000 + 59 * 1000, formatted: '2h 1m 29s'},
  {raw: 2 * 60 * 60 * 1000 + 30 * 1000, formatted: '2h 30s'},
  {raw: 2 * 60 * 60 * 1000 + 300, formatted: '2h 1s'},
  {raw: 2 * 60 * 60 * 1000 + 1200, formatted: '2h 1s'},
  {raw: 2 * 60 * 60 * 1000 + 300, formatted: '2h 1s'}
];

timesToTest.forEach(function (timeToTest) {
  test(`clock - formatTime ${timeToTest.raw}`, t => {
    var formatted = formatTime(timeToTest.raw);
    t.is(formatted, timeToTest.formatted);
    t.log(formatted);
    t.log(timeToTest.formatted);
  });
});
