import { setupTest, get } from '@nuxt/test-utils'

jest.mock('axios', () => ({
  get: jest.fn(() => {
    const singleFeature = require('./fixture/response/single-allow-by-ip-feature')
    return Promise.resolve(singleFeature.default)
  }),
  create: jest.fn(() => {
    return this
  })
}))

describe('ok-request-ip', () => {
  setupTest({
    server: true,
    fixture: 'fixture/ok-request-ip'
  })

  test('should pass if current request is allow by ip', async () => {
    const { body } = await get('/App')
    expect(body).toContain('New Feature Exist')
  })
})
