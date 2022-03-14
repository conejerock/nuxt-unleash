import { AxiosResponse } from 'axios'

const response: Partial<AxiosResponse> = {
  data: {
    version: 1,
    features: [
      {
        name: 'new-feature-by-ip',
        description: 'New feature allowed by IP',
        enabled: true,
        strategies: [
          {
            name: 'userWithId',
            parameters: {
              userIds: '127.0.0.1'
            }
          }
        ]
      }
    ]
  }
}

export default response
