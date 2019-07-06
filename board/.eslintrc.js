module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    }
  },
  rules: {
    "import/no-extraneous-dependencies":"off",
    "import/extensions":"off",
    "no-empty-pattern":"off",
    "no-underscore-dangle":"off",
    "no-param-reassign":"off",
    "no-unused-vars":"off",
    "max-len":"off",
    "no-alert":"off",
    "no-console":"off",
    "class-methods-use-this":"off",
  },
  settings: {
    "import/resolver": "webpack",
  }
};
