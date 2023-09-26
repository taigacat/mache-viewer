const shared = require('./jest.config.js');

process.env.TZ = 'Asia/Tokyo';

/** @type {import('jest').Config} */
module.exports = {
  ...shared,
  displayName: 'snapshot',
  testRegex: '(/__tests__/.*|(\\.|/)(snapspec))\\.tsx?$',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: 'reports',
        outputName: 'test-report-snapshot.xml',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' > ',
      },
    ],
  ],
  collectCoverage: false,
};
