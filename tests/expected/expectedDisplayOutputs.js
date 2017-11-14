module.exports = function expectedDisplayOutputs (time) {
  return {
    'default': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] msg \u001b[1mvalue\u001b[22m',
    'compile': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[35mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'watch': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[90mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'error': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[31mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'change': '\n[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[36mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'add': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[36mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'warn': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[1m\u001b[33mmsg\u001b[39m\u001b[22m \u001b[1mvalue\u001b[22m',
    'reload': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[1m\u001b[33mmsg\u001b[39m\u001b[22m \u001b[1mvalue\u001b[22m',
    'success': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[32mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'remove': '\n[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[36mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'serve': '\n[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[32mmsg\u001b[39m \u001b[4mvalue\u001b[24m\n\n\u001b[33m>>\u001b[39m \u001b[1m\u001b[90m\u001b[3mctrl-c to exit\u001b[23m\u001b[39m\u001b[22m\n'
  };
};
