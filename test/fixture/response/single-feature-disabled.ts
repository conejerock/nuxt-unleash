export default {
  data: {
    version: 1,
    features: [
      {
        name: 'disabled-feature',
        description: 'New feature disabled',
        enabled: false,
        strategies: [
          {
            name: 'default',
            parameters: {}
          }
        ]
      }
    ]
  }
}
