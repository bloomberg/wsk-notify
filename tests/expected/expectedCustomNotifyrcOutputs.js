module.exports = function (time) {
  return {
    'custom-notifyrc': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk-notify\u001b[39m\u001b[22m] \u001b[35mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'project-name-fn': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk/custom-fn\u001b[39m\u001b[22m] \u001b[35mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'project-name-str': '[\u001b[90m' + time + '\u001b[39m | \u001b[1m\u001b[34mwsk/custom\u001b[39m\u001b[22m] \u001b[35mmsg\u001b[39m \u001b[1mvalue\u001b[22m',
    'prefix-style': '<\u001b[4m\u001b[90m' + time + '\u001b[39m\u001b[24m 🍰  \u001b[33mwsk-notify\u001b[39m> \u001b[35mmsg\u001b[39m \u001b[1mvalue\u001b[22m'
  };
};
