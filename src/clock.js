/* --------------------------------------------
 *
 * Helpful clock method
 *
 * var time = clock();
 * var elapsedTime = notify.clock(time); 322ms
 * // or later on
 * var elapsedTime = notify.clock(time); 1.3s
 *
 * --------------------------------------------
 */
var formatTime = require('./utils/formatTime');

module.exports = function clock (start, opts) {
  if (!start) return process.hrtime();
  var end = process.hrtime(start);
  var t = Math.round((end[0] * 1000) + (end[1] / 1000000));
  if (opts && opts.raw === true) {
    return t;
  } else {
    return formatTime(t);
  }
};
