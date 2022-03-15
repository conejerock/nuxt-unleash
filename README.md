# nuxt-unleash

[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-unleash/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-unleash)
[![npm](https://img.shields.io/npm/dt/nuxt-unleash.svg?style=flat-square)](https://npmjs.com/package/nuxt-unleash)

> Nuxt.js module to use Unleash toggle feature services

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

If you are using SPA mode, add an index `/` route to `generate` section of `nuxt.config.js`:

```js
export default {
  generate: {
    unleash: [
      '/'
    ]
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
