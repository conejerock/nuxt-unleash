const path = require('path')

export default {
  rootDir: __dirname,
  buildModules: ['../../../src/module],
  unleash: {
    url: 'http://some-url.com',
    instanceId: 'SOME-KEY-PRODICTION',
    environment: 'production',
    config: {
      headerIp: 'CF-Connecting-IP'
    }
  },
  serverMiddleware: [path.resolve(__dirname, './server-middleware/add-header')]
}
