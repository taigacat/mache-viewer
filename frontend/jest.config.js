process.env.TZ = 'Asia/Tokyo';

/** @type {import('jest').Config} */
module.exports = {
  displayName: 'unit',
  roots: ['<rootDir>/src'],
  preset: 'jest-preset-angular',
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.tsx?$',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@angular|@ngneat|@ngrx|@ngx-translate|ngx-translate-testing|@oip-hps-cmn-js|ngx-infinite-scroll)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^src/(.+)': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*.spec.ts',
    '!**/*.snapspec.ts',
    '!**/assets/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  snapshotResolver: '<rootDir>/snapshotResolver.js',
  coverageDirectory: 'reports/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: 'reports',
        outputName: 'test-report.xml',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' > ',
      },
    ],
  ],
  coverageReporters: ['text', 'html', 'text-summary', 'cobertura'],
  verbose: false,
};
