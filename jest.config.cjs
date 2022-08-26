module.exports = {
  preset: '@nuxt/test-utils',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/module.js',
    'src/runtime/plugin.js'
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/lib/$1',
    '^~~$': '<rootDir>',
    '^@@$': '<rootDir>',
    '^@/(.*)$': '<rootDir>/lib/$1'
  }
}
