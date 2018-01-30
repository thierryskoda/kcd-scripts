<h1 align="center">
  skod-scripts
</h1>


<p align="center">Handle node projects development tasks with no configuration.</p>

## Install

```bash
$ yarn add --dev skod-scripts
```

> **NOTE**: it includes all the dependencies (prettier, jest, eslint, etc) so you don't have to install them.

## Usage

`skod-scripts` exposes a series of scripts to handle development tasks. 

```bash
$ skod-scripts [script] [options]
```

### Available scripts

#### `init`

Adds the available scripts to the project's `package.json`. 

> **WARNING**: it will override anything you have in the properties `test`, `lint` and `format` of the `scripts` field.

#### `format`

Runs prettier on write mode.

#### `lint`

Runs ESLint with `--cache` flag, you can override that with `--no-cache`.

Since ESLint editor integrations require project based configuration to work a local `eslintrc` is needed, for that you can use [`eslint-config-d`](https://github.com/trae/eslint-config-d).

```json
{
  "extends": [
    "d"
  ]
}
```

> **NOTE**: a `.eslintignore` is required until [this eslint issue is resolved](https://github.com/eslint/eslint/issues/9227).

#### `test`

Runs Jest. By default it runs in watch mode unless you are checking coverage (`--coverage`), used the `--no-watch` flag or is running in CI (checked by [`is-ci`](https://github.com/watson/is-ci)).

## Configuration

`skod-scripts` provides an opinionated set of configurations. But all of it can be overridden by adding your own. `skod-scripts` will use the configuration files (or `package.json` property) for each tool if present. The default configuration can be found [here](https://github.com/gillchristian/skod-scripts/blob/master/config).
 
## TODO

- `precommit` hook to format and lint code.
- Run (lint, format) with the provided list of files instead of the default ones.
- Forward options & flags to the scripts.

## Inspiration

`skod-scripts` is our take to provide "tools without config". It was strongly inspired by [@kentcdodds](https://github.com/kentcdodds/)'s version [`kcskod-scripts`](https://github.com/kentcdodds/kcskod-scripts).

- `react-scripts` from [`create-react-app`](https://github.com/facebookincubator/create-react-app).
- [Dan Abramov - The Melting Pot of JavaScript](https://www.youtube.com/watch?v=G39lKaONAlA&feature=youtu.be).
- [Tools without config 🛠📦](https://blog.kentcdodds.com/automation-without-config-412ab5e47229) by [@kentcdodds](https://github.com/kentcdodds/).

## LICENSE

MIT