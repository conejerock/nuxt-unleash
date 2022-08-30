import { resolve } from 'path'
import axios from 'axios'
import consola, { Consola } from 'consola'
import { defineNuxtModule, createResolver, addPluginTemplate } from '@nuxt/kit'
import { Nuxt } from '@nuxt/schema'

export interface ModuleOptionsConfig {
  enabledDefault?: boolean;
  headerIP?: string;
}

export interface ModuleOptions {
  url: string;
  environment: string;
  instanceId: string;
  config: ModuleOptionsConfig;
}

const logger: Consola = consola.withTag('nuxt:unleash')

const fetchData = async (
  url: string,
  instanceId: string,
  environment?: string
) => {
  if (!url || !instanceId) {
    return undefined
  }

  try {
    const { data } = await axios.get(`${url}/features`, {
      headers: {
        'UNLEASH-INSTANCEID': instanceId,
        ...(environment && { 'UNLEASH-APPNAME': environment })
      }
    })
    return data.features
  } catch (e) {
    logger.error(`Cannot fetch data from url ${url}`)
    return undefined
  }
}

// @ts-ignore
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-unleash',
    configKey: 'unleash',
    compatibility: {
      nuxt: '^3.0.0 || ^2.16.0',
      bridge: true
    }
  },
  defaults: {
    url: '',
    environment: '',
    instanceId: '',
    config: {}
  },
  // @ts-ignore
  async setup (options: ModuleOptions, nuxt: Nuxt): Promise<void> {
    if (!options.url) {
      logger.warn('url option is not set')
    }

    if (!options.instanceId) {
      logger.warn('instanceId option is not set')
    }
    const { url, environment, instanceId, config } = options
    const featureFlags = await fetchData(url, instanceId, environment)

    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')
    const srcPlugin = resolve(runtimeDir, 'plugin.ts')
    nuxt.options.build.transpile.push(runtimeDir)

    addPluginTemplate({
      options: {
        data: JSON.stringify(featureFlags),
        config: JSON.stringify(config || {})
      },
      src: srcPlugin
    })
  }
})
