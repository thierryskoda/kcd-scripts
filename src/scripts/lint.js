const path = require('path')
const spawn = require('cross-spawn')
const yargsParser = require('yargs-parser')
const {hasPkgProp, resolveBin, hasFile, ifInPackageJson} = require('../utils')

let args = process.argv.slice(2)
const here = p => path.join(__dirname, p)
const parsedArgs = yargsParser(args)

const useBuiltinConfig =
  !args.includes('--config') &&
  !hasFile('.eslintrc') &&
  !hasPkgProp('eslintConfig') &&
  !ifInPackageJson('eslintConfig')

const config = useBuiltinConfig
  ? ['--config', here('../config/eslintrc.js')]
  : []

const useBuiltinIgnore =
  !args.includes('--ignore-path') &&
  !hasFile('.eslintignore') &&
  !hasPkgProp('eslintIgnore') &&
  !ifInPackageJson('eslintIgnore')

const ignore = useBuiltinIgnore
  ? ['--ignore-path', here('../config/eslintignore')]
  : []

const cache = args.includes('--no-cache') ? [] : ['--cache']

const filesGiven = parsedArgs._.length > 0

const filesToApply = filesGiven ? [] : ['.']

if (filesGiven) {
  // we need to take all the flag-less arguments (the files that should be linted)
  // and filter out the ones that aren't js files. Otherwise json or css files
  // may be passed through
  args = args.filter(a => !parsedArgs._.includes(a) || a.endsWith('.js'))
}

const result = spawn.sync(
  resolveBin('eslint'),
  [...config, ...ignore, ...cache, ...filesToApply, ...args],
  {stdio: 'inherit'},
)

process.exit(result.status)
