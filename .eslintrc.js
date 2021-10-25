const baseConfig = require('@j4numbers/eslint-base-config');

module.exports = {
  ...baseConfig,

  env: {
    'es6': true,
    'commonjs': true,
    'node': true,
    'browser': true,
    'jquery': true,
  },
};
