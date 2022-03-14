import { setupTest, mockConsola } from '@nuxt/test-utils'

describe('fail-service', () => {
  setupTest({
    server: true,
    fixture: 'fixture/ok'
  })

  jest.mock('axios', () => ({
    create: jest.fn().mockImplementation(() => Promise.resolve()),
    get: jest.fn().mockImplementation(() => Promise.reject(Error('Cant connect')))
  }))

  const logger = mockConsola()

  test('should warn if fail unleash service', () => {
    expect(logger.error).toHaveBeenCalledWith('Cannot fetch data from url http://some-url.com')
  })
})
