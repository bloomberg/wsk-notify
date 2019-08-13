/* --------------------------------------------
 *
 * Pretty-print milliseconds into their most-sensible units, up to the minute
 * Rules:
 *  Up to milliseconds, they are displayed in full
 *  Up to seconds, they are displayed up to two decimal places
 *  Up to minutes, displayed with seconds, rounded to nearest second if milliseconds
 *  Up to hours, displayed with minutes and seconds rounded up to nearest second if milliseconds.
 *  Round up so you don't get something like `1h 0s`.
 *
 * See tests for examples.
 * --------------------------------------------
 */

// Remove trailing zeros
function truncate (val, to) {
  var str = val.toFixed(to);
  return str.replace(/0$/, '');
}

module.exports = function formatTime (milliseconds) {
  var oneHour = 3600000;
  var oneMinute = 60000;
  var oneSecond = 1000;
  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var result = '';
  if (milliseconds === 0) {
    return '0ms';
  }

  if (milliseconds >= oneHour) {
    hours = Math.floor(milliseconds / oneHour);
  }

  milliseconds = hours > 0 ? (milliseconds - hours * oneHour) : milliseconds;

  if (milliseconds >= oneMinute) {
    minutes = Math.floor(milliseconds / oneMinute);
  }

  milliseconds = minutes > 0 ? (milliseconds - minutes * oneMinute) : milliseconds;

  if (milliseconds >= oneSecond) {
    seconds = Math.floor(milliseconds / oneSecond);
  }

  milliseconds = seconds > 0 ? (milliseconds - seconds * oneSecond) : milliseconds;

  if (hours) {
    result += hours + 'h ';
  }
  if (minutes) {
    result += minutes + 'm';
    if (seconds) {
      result += (' ' + seconds + 's');
    }
  } else if (seconds && !milliseconds) {
    result += seconds + 's';
  } else if (hours && seconds && milliseconds) {
    result += Math.round(seconds + milliseconds / 1000) + 's';
  } else if (seconds && milliseconds) {
    result += truncate(seconds + (Math.round((milliseconds / 1000) * 100) / 100), 2) + 's';
  } else if (hours && !seconds && milliseconds) {
    result += Math.ceil(milliseconds / 1000) + 's';
  } else if (milliseconds) {
    result += (Math.round(milliseconds * 10) / 10) + 'ms';
  }

  return result;
};
