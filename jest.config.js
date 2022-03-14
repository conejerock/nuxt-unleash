module.exports = {
  preset: '@nuxt/test-utils',
  collectCoverageFrom: ['src/fetch.ts', 'src/print.ts', 'src/index.ts'],
  transform: {
    '\\.[jt]s?$': '@sucrase/jest-plugin'
  }
}
