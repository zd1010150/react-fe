module.exports = {
  extends: 'airbnb',

  overrides: [
    {
      files: 'test/**/*.js',
      env: {
          jest: true,
      },
    },
  ],
}
