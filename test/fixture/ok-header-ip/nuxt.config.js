const path = require('path')
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  rootDir: __dirname,
  buildModules: ['../../../src/module'],
  unleash: {
    url: 'http://some-url.com',
    instanceId: 'SOME-KEY-PRODICTION',
    environment: 'production',
    config: {
      headerIP: 'CF-Connecting-IP'
    }
  }
});
