export default {
  rootDir: __dirname,
  buildModules: ['../../../src/module'],
  unleash: {
    url: 'http://some-url.com',
    instanceId: 'SOME-KEY-PRODUCTION',
    environment: 'production'
  }
}
