import { setupTest, get } from '@nuxt/test-utils'

describe('ok', () => {
  jest.mock('axios', () => ({
    get: jest.fn(() => {
      const singleFeature = require('./fixture/response/single-feature')
      return Promise.resolve(singleFeature.default)
    }),
    create: jest.fn(() => {
      return this
    })
  }))
  setupTest({
    server: true,
    fixture: 'fixture/ok'
  })

  test('should pass module with template instance', async () => {
    const { body } = await get('/App')
    expect(body).toContain('New Feature Exist')
  })
})
