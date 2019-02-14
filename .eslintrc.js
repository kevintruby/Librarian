module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': [ 'error', {
      'singleline': 3,
      'multiline': {
        'max': 3,
        'allowFirstLine': true
      },
    }],
    'vue/name-property-casing': 'off',
    'vue/order-in-components': ["error", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["props", "propsData"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        ["inject", "provide"],
        "inheritAttrs",
        "model",
        ["data", "asyncData"],
        "validations",
        "LIFECYCLE_HOOKS",
        "computed",
        "watch",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }]
  },
};
