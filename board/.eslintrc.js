module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    }
  },
  parser: "babel-eslint",
  rules: {
    "import/no-named-as-default":"off",
    "import/no-named-as-default-member":"off",
    "no-unused-vars":"off",
    "no-duplicates":"off",
    "no-param-reassign":"off",
    "no-shadow":"off",
    "max-len":"off",
    "no-underscore-dangle":"off",
    "no-alert":"off",
    "no-console":"off",
    "import/extensions":"off",
    "import/no-extraneous-dependencies":"off",
    "import/no-duplicates":"off",
    "eqeqeq":"off",
    "class-methods-use-this":"off",
    "radix":"off",
    "no-dupe-keys":"off",
    "prefer-destructuring":"off",
  },
  settings: {
    "import/resolver": "webpack",
  }
};

