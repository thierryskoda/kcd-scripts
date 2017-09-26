const fs = require('fs')
const path = require('path')
const arrify = require('arrify')
const has = require('lodash.has')
const readPkgUp = require('read-pkg-up')

const {pkg, path: pkgPath} = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})
const appDirectory = path.dirname(pkgPath)

function resolveBin(modName, {executable = modName} = {}) {
  const modPkgPath = require.resolve(`${modName}/package.json`)
  const modPkgDir = path.dirname(modPkgPath)
  const {bin} = require(modPkgPath)
  if (typeof bin === 'string') {
    return path.join(modPkgDir, bin)
  }
  return path.join(modPkgDir, bin[executable])
}

const fromRoot = (...p) => path.join(appDirectory, ...p)
const hasFile = (...p) => fs.existsSync(fromRoot(...p))
const ifFile = (files, t, f) =>
  arrify(files).some(file => hasFile(file)) ? t : f

const hasPkgProp = props => arrify(props).some(prop => has(pkg, prop))

const hasPkgSubProp = pkgProp => props =>
  hasPkgProp(arrify(props).map(p => `${pkgProp}.${p}`))

const ifPkgSubProp = pkgProp => (props, t, f) =>
  hasPkgSubProp(pkgProp, props) ? t : f

const hasScript = hasPkgSubProp('scripts')
const hasPeerDep = hasPkgSubProp('peerDependencies')
const hasDep = hasPkgSubProp('dependencies')
const hasDevDep = hasPkgSubProp('devDependencies')
const hasAnyDep = (...args) =>
  [hasDep, hasDevDep, hasPeerDep].some(fn => fn(...args))

const ifPeerDep = ifPkgSubProp('peerDependencies')
const ifDep = ifPkgSubProp('dependencies')
const ifDevDep = ifPkgSubProp('devDependencies')
const ifAnyDep = (deps, t, f) => (hasAnyDep(deps) ? t : f)
const ifScript = ifPkgSubProp('scripts')

const packageJsonFile = require(`${fromRoot()}/package.json`)
const ifInPackageJson = field => packageJsonFile[field]

function parseEnv(name, def) {
  if (process.env.hasOwnProperty(name)) {
    return JSON.parse(process.env[name])
  }
  return def
}

function getConcurrentlyArgs(scripts) {
  const colors = [
    'bgBlue',
    'bgGreen',
    'bgMagenta',
    'bgCyan',
    'bgWhite',
    'bgRed',
    'bgBlack',
    'bgYellow',
  ]
  const prefixColors = Object.keys(scripts)
    .reduce(
      (pColors, _s, i) =>
        pColors.concat([`${colors[i % colors.length]}.bold.reset`]),
      []
    )
    .join(',')

  // prettier-ignore
  return [
    '--kill-others-on-fail',
    '--prefix', '[{name}]',
    '--names', Object.keys(scripts).join(','),
    '--prefix-colors', prefixColors,
    ...Object.values(scripts).map(s => JSON.stringify(s)), // stringify escapes quotes ✨
  ]
}

module.exports = {
  ifDevDep,
  ifPeerDep,
  ifScript,
  ifDep,
  ifAnyDep,
  ifInPackageJson,
  hasPkgProp,
  appDirectory,
  fromRoot,
  hasScript,
  resolveBin,
  parseEnv,
  pkg,
  hasFile,
  ifFile,
  getConcurrentlyArgs,
}
