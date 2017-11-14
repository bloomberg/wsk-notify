module.exports = function print (notification, level, silent) {
  if (silent !== true) {
    console[level](notification);
  }
  return notification;
};
