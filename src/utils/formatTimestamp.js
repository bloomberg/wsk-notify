/* --------------------------------------------
 *
 * Create a HH:MM:SS.ms timestamp from a date object
 * Convert milliseconds into deciseconds, capped at 99
 *
 * --------------------------------------------
 */
module.exports = function formatTimestamp (d) {
  var milli = Math.round(d.getMilliseconds() / 10);
  if (milli < 10) {
    milli = '0' + milli;
  } else if (milli === 100) {
    milli = '99';
  }
  return d.toTimeString().split(' ')[0] + '.' + milli;
};
