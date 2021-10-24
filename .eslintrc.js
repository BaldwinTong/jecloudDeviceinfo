module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'prettier', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    JE: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    'vue/no-reserved-keys': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
