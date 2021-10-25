module.exports = {
  'lines': 80,
  'statements': 80,
  'functions': 80,
  'branches': 80,

  'exclude': [
    '.stryker-tmp/',
    'config/**',
    'coverage/**',
    'data/**',
    'node_modules/**',
    'public/**',
    'reports/**',
    'src/javascript/**',
    'test/**',
    '**/.eslintrc.js',
    'gulpfile.js',
    'nyc.config.js',
    'nyc.js.config.js',
    'stryker.conf.js',
  ],

  'reporter': [
    'lcov',
    'cobertura',
    'text',
    'text-summary',
  ],
};
