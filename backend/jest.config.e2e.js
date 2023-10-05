const shared = require('./jest.config.js');

module.exports = {
  ...shared,
  displayName: 'e2e',
  preset: './jest.preset.e2e.js',
  testRegex: '(/__tests__/.*|(\\.|/)(e2e-spec))\\.tsx?$',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: 'reports',
        outputName: 'junit-e2e.xml',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' > ',
      },
    ],
  ],
  collectCoverage: false,
};
