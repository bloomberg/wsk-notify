/* --------------------------------------------
 *
 * Allow for shorthand for aliases provided.
 *
 * --------------------------------------------
 */
var aliases = [
  {key: 'message', alias: 'm'},
  {key: 'value', alias: 'v'},
  {key: 'display', alias: 'd'},
  {key: 'silent', alias: 's'},
  {key: 'error', alias: 'e'},
  {key: 'extend', alias: 'x'}
];
module.exports = function fillAliases (settings) {
  aliases.forEach(group => {
    if (typeof settings[group.alias] !== 'undefined') {
      settings[group.key] = settings[group.alias];
    }
  });
  return settings;
};
