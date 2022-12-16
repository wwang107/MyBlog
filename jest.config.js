/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleFileExtensions:["js","ts"],
  testMatch: [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ]
};
