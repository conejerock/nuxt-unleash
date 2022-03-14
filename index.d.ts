import 'vue'
import '@nuxt/types'
// @ts-ignore
import { UnleashFlags, ModuleOptions } from './dist/index'
// @ts-ignore
export * from './dist/index'

declare module '@nuxt/types' {
  interface Context {
    $unleash: UnleashFlags
  }
  interface NuxtAppOptions {
    $unleash: UnleashFlags
  }
  interface Configuration {
    $unleash?: Partial<ModuleOptions>
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: UnleashFlags
  }
}
