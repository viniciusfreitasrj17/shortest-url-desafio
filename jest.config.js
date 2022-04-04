/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  moduleNameMapper: {
    "test/(.*)": "<rootDir>/test/$1",
  },
  verbose: true,
};
