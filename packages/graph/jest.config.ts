/* eslint-disable */
export default {
  displayName: 'graph',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/graph',
  setupFilesAfterEnv: ['jest-extended/all'],
  globalSetup: './jestGlobalSetup.ts',
};
