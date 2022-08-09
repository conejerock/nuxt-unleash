<p align="center">
    <img src="https://raw.githubusercontent.com/conejerock/nuxt-unleash/main/docs/icon.svg" width="300">
</p>

# nuxt-unleash

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Nuxt.js module to use [Unleash](https://github.com/Unleash/unleash) toggle feature services

[📖 **Release Notes**](./CHANGELOG.md)

## Features

Use `$unleash` to access and handle your *Unleash* feature flags in client side,
or `context.app.unleash` to access _Unleash_ feature flags from server side.

## Setup

1. Add `nuxt-unleash` dependency to your project

```bash
yarn add nuxt-unleash
```

2. Add `nuxt-unleash` to the `modules` section of `nuxt.config.js`

```js
export default {
  modules: [
    // Simple usage
    'nuxt-unleash',

    // With options
    ['nuxt-unleash', { /* module options */ }]
  ]
}
```

:warning: If you are using Nuxt **< v2.9** you have to install the module as a `dependency` (No `--dev` or `--save-dev` flags) and use `modules` section in `nuxt.config.js` instead of `buildModules`.

### Using top level options

```js
export default {
  buildModules: [
    'nuxt-unleash'
  ],
  unleash: {
    /* module options */
  }
}
```

## Options

### `url`

- Type: `String`
- Required: `true`

Unleash API URL

### `instanceId`

- Type: `String`
- Required: `true`

Unleash API Instance ID

### `environment`

- Type: `String`
- Required: `false`

Name of the environment your Unleash application runs in. See the [example configuration](https://docs.gitlab.com/ee/operations/feature_flags.html#golang-application-example).

### `config`

The module allows some configuration parameters.


If you want to default to the value of a feature that doesn't exist, use:

`enabledDefault: true`

On the other hand, to set a header as the source of the ip, you can add:

`headerIP: 'CF-Connection-IP'`



## Usage

#### Client Side

To access the module in __side client__ you just have to call `this.$unleash` and method you want to use.

```js
<template>
  <h1>{{ value ? 'enabled' : 'disabled' }}</h1>
</template>

<script>
export default {
  mounted() {
    this.value = this.$unleash.isEnabled('new-feature')
  }
}
</script>

```

#### Sever Side

To access the module in __side server__ you just have to call `ctx.app.unleash` and method you want to use.

```js
asyncData(ctx) {
  const value = ctx.app.unleash.isEnabled('new-feature')
  if(value) {
      ctx.redirect('/new-feature-page')
  }
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)


Copyright (c) Conejerock

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-unleash/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-unleash

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-unleash.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-unleash

[github-actions-ci-src]: https://github.com/conejerock/nuxt-unleash/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/conejerock/nuxt-unleash/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/conejerock/nuxt-unleash.svg
[codecov-href]: https://codecov.io/gh/conejerock/nuxt-unleash

[license-src]: https://img.shields.io/npm/l/nuxt-unleash.svg
[license-href]: https://npmjs.com/package/nuxt-unleash
