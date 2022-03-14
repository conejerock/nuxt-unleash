import { setupTest, mockConsola } from '@nuxt/test-utils'

const logger = mockConsola()

describe('options-without-instance-id', () => {
  setupTest({
    build: true,
    server: true,
    fixture: 'fixture/options-without-instance-id'
  })

  test('should warn if not option instanceId', () => {
    expect(logger.warn).toHaveBeenCalledWith(expect.stringMatching('instanceId option is not set'))
  })
})
