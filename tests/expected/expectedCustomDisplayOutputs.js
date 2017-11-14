module.exports = function expectedDisplayOutputs (time) {
  return {
    'no-msg': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[1mvalue\u001b[22m',
    'no-value': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[35mmsg\u001b[39m',
    'inline-1': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[36m\u001b[4mmsg\u001b[24m\u001b[39m \u001b[1mvalue\u001b[22m',
    'inline-2': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[4mmsg\u001b[24m \u001b[1mvalue\u001b[22m',
    'custom-name': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[35m\u001b[1mmsg\u001b[22m\u001b[39m \u001b[4mvalue\u001b[24m'
  };
};
