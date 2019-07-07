module.exports = {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
    ecmaFeatures:  {
      jsx:  true,  // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: "detect"
    },
  },
  rules:  {
    "@typescript-eslint/indent": ['error', 2],
    "@typescript-eslint/interface-name-prefix": "always",
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true,
    }],
    "@typescript-eslint/explicit-member-accessibility": { 
      "accessibility": "no-public" 
    },
    "@typescript-eslint/camelcase": "off",
  },
};
