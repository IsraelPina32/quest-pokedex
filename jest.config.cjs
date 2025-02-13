module.exports =  {
    testEnvironment: "jest-environment-jsdom", 
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom", "./jest.setup.js"],
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest",
    },
  };
  