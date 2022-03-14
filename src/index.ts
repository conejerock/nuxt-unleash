import type { Module } from '@nuxt/types'
import consola, { Consola } from 'consola'
import { name, version } from '../package.json'
import printChalk from './print'
import fetchData from './fetch'

const { resolve, join } = require('path')

const logger: Consola = consola.withTag('nuxt:unleash')

const CONFIG_KEY = 'unleash'

const nuxtModule: Module = async function (moduleOptions) {
  const options = {
    ...this.options['unleash-module'],
    ...this.options[CONFIG_KEY],
    ...moduleOptions
  }

  if (!options.url) {
    logger.warn('url option is not set')
  }

  if (!options.instanceId) {
    logger.warn('instanceId option is not set')
  }

  const { url, environment, instanceId, config } = options

  const featureFlags = await fetchData(url, instanceId, environment)

  printChalk(featureFlags, this.nuxt.options)

  this.addTemplate({
    src: resolve(__dirname, '../templates/UnleashFlags.js'),
    fileName: join('UnleashFlags.js')
  })

  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.ts'),
    fileName: join('unleash.js'),
    options: {
      data: JSON.stringify(featureFlags),
      config: JSON.stringify(config || {})
    }
  })
};

(nuxtModule as any).meta = { name, version }

export default nuxtModule
