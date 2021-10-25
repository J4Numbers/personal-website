const baseConfig = require('./nyc.config.js');

module.exports = {
  ...baseConfig,
  _reportDir: './coverage/js',
  all: true,
  include: [
    'src/',
  ],
};
