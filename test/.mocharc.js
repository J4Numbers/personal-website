module.exports = {
  require: [
    'test/spec/helpers/setup.js',
    'test/spec/helpers/server-setup.js',
  ],
  globals: [
    '__coverage__',
    'Generator',
  ],
  spec: 'test/spec/app/**/*.js',
  timeout: 10000,
  exit: true,
}
