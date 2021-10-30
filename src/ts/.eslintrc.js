const baseConfig = require('@j4numbers/eslint-typescript-config');

module.exports = {
  ...baseConfig,

  parserOptions: {
    project: 'src/tsconfig.json'
  },

  ignorePatterns: [
    '*.eslintrc*',
  ],
};
