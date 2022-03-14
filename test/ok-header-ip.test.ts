import { setupTest, get } from '@nuxt/test-utils'

jest.mock('axios', () => ({
  get: jest.fn(() => {
    const singleFeature = require('./fixture/response/single-allow-by-ip-variant-feature')
    return Promise.resolve(singleFeature.default)
  }),
  create: jest.fn(() => {
    return this
  })
}))

describe('ok-header-ip', () => {
  setupTest({
    server: true,
    fixture: 'fixture/ok-header-ip'
  })

  test('should pass if current header request is allow by ip', async () => {
    const { body } = await get('/App')
    expect(body).toContain('New Feature Exist')
  })
})
