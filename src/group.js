/* --------------------------------------------
 *
 * Add multiple notificatoins to a group to be later printed out all at once
 * The timestamp for each notification is pegged to when it was .add-ed
 *
 * --------------------------------------------
 */

var _ = require('underscore');

module.exports = function wrapper (notify) {
  var list = [];
  var buffered = {};

  /* --------------------------------------------
   * Put our list back at empty
   */
  function reset () {
    list = [];
  }

  /* --------------------------------------------
   * Return a shallow copy
   */
  buffered.list = function () {
    return list.map(d => d);
  };

  /* --------------------------------------------
   * Bake out a notification and stash its string in our list
   */
  buffered.add = function (__) {
    if (__) {
      // Notify siliently so that you don't display a notification on add
      list.push(notify(_.extend({}, __, {silent: true})));
    }
    return buffered;
  };

  /* --------------------------------------------
   * Report out everything in our list
   */
  buffered.notify = function (opts) {
    // Stash this so we can reset the internal value before returning
    var thisList = buffered.list();
    reset();
    if (!opts || opts.silent !== true) {
      console.log(thisList.join('\n'));
    }
    return thisList;
  };

  return buffered;
};
