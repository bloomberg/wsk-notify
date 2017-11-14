/* --------------------------------------------
 *
 * Clean up internal errors before sending them to the user by calling our notify-each function recursively
 * Keep the `silent` setting the user specified, assuming they'll see the error in their normal course of business
 *
 * --------------------------------------------
 */
var _ = require('underscore');

module.exports = function handleInternalError (errorNotification, silent, notify) {
  return notify(_.extend({}, errorNotification, {silent: silent}));
};
