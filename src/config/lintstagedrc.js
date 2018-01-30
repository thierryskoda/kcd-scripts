const [executor] = process.argv

const scripts = `${executor} ${require.resolve('../')}`

module.exports = {
  linters: {
    '**/*.+(js|json|less|css|ts)': [
      `${scripts} format`,
      `${scripts} lint`,
      'git add',
    ],
  },
}
