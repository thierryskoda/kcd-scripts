<div align="center">
<h1>skod-scripts</h1>
<strong>CLI for common scripts for my projects. Forked from [kcd-scripts][kcd-scripts]</strong>
</div>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmcharts]
[![MIT License][license-badge]][LICENSE]

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

<a href="https://app.codesponsor.io/link/PKGFLnhDiFvsUA5P4kAXfiPs/kentcdodds/skod-scripts" rel="nofollow"><img src="https://app.codesponsor.io/embed/PKGFLnhDiFvsUA5P4kAXfiPs/kentcdodds/skod-scripts.svg" style="width: 888px; height: 68px;" alt="Sponsor" /></a>

## The problem

I do a bunch of open source and want to make it easier to maintain so many
projects.

## This solution

This is a CLI that abstracts away all configuration for my open source projects
for linting, testing, building, and more.

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev skod-scripts
```

## Usage

This is a CLI and exposes a bin called `skod-scripts`. I don't really plan on
documenting or testing it super duper well because it's really specific to my
needs. You'll find all available scripts in `src/scripts`.

This project actually dogfoods itself. If you look in the `package.json`, you'll
find scripts with `node src {scriptName}`. This serves as an example of some
of the things you can do with `skod-scripts`.

### Overriding Config

Unlike `react-scripts`, `skod-scripts` allows you to specify your own
configuration for things and have that plug directly into the way things work
with `skod-scripts`. There are various ways that it works, but basically if you
want to have your own config for something, just add the configuration and
`skod-scripts` will use that instead of it's own internal config. In addition,
`skod-scripts` exposes its configuration so you can use it and override only
the parts of the config you need to.

This can be a very helpful way to make editor integration work for tools like
ESLint which require project-based ESLint configuration to be present to work.

So, if we were to do this for ESLint, you could create an `.eslintrc` with the
contents of:

```
{"extends": "./node_modules/skod-scripts/eslint.js"}
```

> Note: for now, you'll have to include an `.eslintignore` in your project until
> [this eslint issue is resolved](https://github.com/eslint/eslint/issues/9227).

Or, for `babel`, a `.babelrc` with:

```
{"presets": ["skod-scripts/babel"]}
```

Or, for `jest`:

```javascript
const {jest: jestConfig} = require('skod-scripts/config')
module.exports = Object.assign(jestConfig, {
  // your overrides here
})
```

## LICENSE

MIT

[kcd-scripts]: https://github.com/kentcdodds/kcd-scripts
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/kentcdodds/skod-scripts.svg?style=flat-square
[build]: https://travis-ci.org/kentcdodds/skod-scripts
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/skod-scripts.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/skod-scripts
[version-badge]: https://img.shields.io/npm/v/skod-scripts.svg?style=flat-square
[package]: https://www.npmjs.com/package/skod-scripts
[downloads-badge]: https://img.shields.io/npm/dm/skod-scripts.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/skod-scripts
[license-badge]: https://img.shields.io/npm/l/skod-scripts.svg?style=flat-square
[license]: https://github.com/kentcdodds/skod-scripts/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/skod-scripts/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]: https://img.shields.io/github/watchers/kentcdodds/skod-scripts.svg?style=social
[github-watch]: https://github.com/kentcdodds/skod-scripts/watchers
[github-star-badge]: https://img.shields.io/github/stars/kentcdodds/skod-scripts.svg?style=social
[github-star]: https://github.com/kentcdodds/skod-scripts/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20skod-scripts!%20https://github.com/kentcdodds/skod-scripts%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/kentcdodds/skod-scripts.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
