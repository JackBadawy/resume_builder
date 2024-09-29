module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/Tests/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  setupFilesAfterEnv: ["./selenium.setup.js"],
  transformIgnorePatterns: ["node_modules/(?!(selenium-webdriver)/)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
