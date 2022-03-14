export default {
  rootDir: __dirname,
  buildModules: ['../../../src/index.ts'],
  unleash: {
    url: 'http://some-url.com',
    instanceId: 'SOME-KEY-PRODICTION',
    environment: 'production'
  }
}
