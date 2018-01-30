const {ifAnyDep} = require('../utils')

module.exports = {
  extends: [
    require.resolve('eslint-config-kentcdodds'),
    ifAnyDep('react', require.resolve('eslint-config-kentcdodds/jsx-a11y')),
    ifAnyDep('react', require.resolve('eslint-config-kentcdodds/react')),
  ].filter(Boolean),
  rules: {
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^ignored',
      },
    ],
    'func-style': 'off',
    'no-process-exit': 'off',
    'comma-dangle': 'off',
    'no-else-return': 'off',
    'global-require': 'off',
    'no-use-before-define': 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'no-prototype-builtins': 'off',
    'no-nested-ternary': 'off',
    'import/no-unassigned-import': 'off',
  },
}
