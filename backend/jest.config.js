module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(axios|nanoid)/)'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^@src(.+)': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/test/**',
    '!**/mock/**',
    '!**/di.config.ts',
    '!**/env.ts',
  ],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: 'reports',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' > ',
      },
    ],
  ],
  coverageReporters: ['text', 'html', 'cobertura'],
};
