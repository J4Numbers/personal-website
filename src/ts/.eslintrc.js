const baseConfig = require('@j4numbers/eslint-typescript-config');

module.exports = {
  ...baseConfig,

  ignorePatterns: [
    '*.eslintrc*',
  ],
};
