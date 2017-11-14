/* --------------------------------------------
 *
 * Base notifyrc file.
 *
 * --------------------------------------------
 */

var chalk = require('chalk');
var projectName = require('../lib/getProjectName');
var formatTimestamp = require('../utils/formatTimestamp');

module.exports = {
  time: formatTimestamp,
  projectName: projectName,
  customDisplays: {},
  globalPrefixStyle: {
    open: '[',
    close: ']',
    sep: '|',
    timestampStyle: 'gray',
    projectNameStyle: ['blue', 'bold']
  },
  // Base style for any display
  defaultDisplaySettings: {
    messageStyle: '',
    valueStyle: 'bold',
    preString: '',
    postString: '',
    skipPrefix: false,
    prefixStyle: {},
    projectName: null,
    time: null,
    desktop: false,
    level: 'log'
  },
  defaultDisplays: {
    'default': {},
    'compile': 'magenta',
    'watch': 'gray',
    'error': {
      messageStyle: 'red',
      desktop: true,
      level: 'error'
    },
    'warn': {
      messageStyle: ['yellow', 'bold'],
      level: 'warn'
    },
    'change': {
      preString: '\n',
      messageStyle: 'cyan'
    },
    'add': 'cyan',
    'reload': ['yellow', 'bold'],
    'success': 'green',
    'remove': {
      preString: '\n',
      messageStyle: 'cyan'
    },
    'serve': {
      preString: '\n',
      messageStyle: 'green',
      valueStyle: 'underline',
      postString: '\n\n' + chalk.yellow('>>') + ' ' + chalk.bold.gray.italic('ctrl-c to exit') + '\n'
    }
  }
};
