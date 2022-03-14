import { setupTest, get } from '@nuxt/test-utils'

jest.mock('axios', () => ({
  get: jest.fn(() => {
    const singleFeature = require('./fixture/response/single-feature-disabled')
    return Promise.resolve(singleFeature.default)
  }),
  create: jest.fn(() => {
    return this
  })
}))

describe('ok-disabled', () => {
  setupTest({
    server: true,
    fixture: 'fixture/ok-disabled'
  })

  test('should pass if feature exists and is disabled', async () => {
    const { body } = await get('/App')
    expect(body).toContain('New Feature Exists and Disabled')
  })
})
