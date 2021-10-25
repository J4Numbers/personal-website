const baseConfig = require('@j4numbers/eslint-base-config');

module.exports = {
  ...baseConfig,

  plugins: [ 'mocha' ],

  'env': {
    ...baseConfig.env,
    'mocha': true,
  },

  'globals': {
    'expect': true,
    'server': true,
    'sinon': true,
    'request': true,
    'testRequire': true,
    'importFresh': true,
    'startMockRequire': true,
    'stopMockRequire': true,
  },
  'overrides': [
    {
      files: [ '*_spec.js' ],
      rules: {
        'no-unused-expressions': 'off',
        'mocha/no-mocha-arrows': 'error',
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-skipped-tests': 'warn',
        'func-names': 'off',
        'prefer-arrow-callback': 'off',
        'quote-props': 'off',
        'global-require': 'off',
      },
    },
  ],
};
