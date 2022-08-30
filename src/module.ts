import { resolve } from 'path'
import { dim } from 'colorette'
import axios from 'axios'
import { defineNuxtModule, createResolver, addPluginTemplate, logger } from '@nuxt/kit'
import { Nuxt } from '@nuxt/schema'
import print from './print'

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

const fetchData = async (
  url: string,
  instanceId: string,
  environment?: string
) => {
  if (!url || !instanceId) {
    return []
  }

  try {
    const { data } = await axios.get(`${url}/features`, {
      headers: {
        'UNLEASH-INSTANCEID': instanceId,
        ...(environment && { 'UNLEASH-APPNAME': environment })
      }
    })
    return data.features || []
  } catch (e) {
    logger.error(`Cannot fetch data from url ${url}`)
    return []
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

    if (!nuxt.options.ssr) {
      logger.warn(`With ${dim('ssr:false')}, isAllowIP is disabled`)
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
    print(featureFlags, logger)
  }
})
