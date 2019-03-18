module.exports = {
  verbose: true,
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue"
  ],
  transform: {
    "^.+\\.jsx$": "babel-jest",
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverage: true,
};

