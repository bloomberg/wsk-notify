import test from 'ava';
var formatTimestamp = require('../src/utils/formatTimestamp');

var timesToTest = [
  {raw: new Date(2017, 0, 1), formatted: '00:00:00.00'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 0), formatted: '11:33:30.00'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 50), formatted: '11:33:30.05'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 45), formatted: '11:33:30.05'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 40), formatted: '11:33:30.04'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 100), formatted: '11:33:30.10'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 350), formatted: '11:33:30.35'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 340), formatted: '11:33:30.34'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 356), formatted: '11:33:30.36'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 900), formatted: '11:33:30.90'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 990), formatted: '11:33:30.99'},
  {raw: new Date(2017, 0, 1, 11, 33, 30, 998), formatted: '11:33:30.99'}
];

timesToTest.forEach(function (timeToTest) {
  test(`clock formatting: ${timeToTest.raw}`, t => {
    var formatted = formatTimestamp(timeToTest.raw);
    t.is(formatted, timeToTest.formatted);
    t.log(timeToTest.formatted);
  });
});
