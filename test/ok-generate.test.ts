import { setupTest, get } from '@nuxt/test-utils'

describe('ok', () => {
  jest.mock('axios', () => ({
    get: jest.fn(() => {
      const singleFeature = require('./fixture/response/single-allow-by-ip-feature')
      return Promise.resolve(singleFeature.default)
    }),
    create: jest.fn(() => {
      return this
    })
  }))
  setupTest({
    server: true,
    generate: true,
    fixture: 'fixture/ok-generate'
  })

  test('should pass module with template instance', async () => {
    const { body } = await get('/App')
    expect(body).toContain('New Feature Doesnt Exist')
  })
})
