module.exports = {
  babel: require('./babelrc'),
  eslint: require('./eslintrc'),
  lintStaged: require('./lintstagedrc'),
  prettier: require('./prettierrc'),
  getRollupConfig: () => require('./rollup.config'),
}
