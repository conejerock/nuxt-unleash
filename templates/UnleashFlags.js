export default class UnleashFlags {
  config
  context
  features

  constructor (
    features,
    config = undefined,
    context = undefined
  ) {
    this.config = Object.assign({ enabledDefault: false }, config)
    this.context = Object.assign({}, context)
    this.features = Object.assign([], features)
  }

  static create ({
    features,
    config,
    context
  }) {
    return new UnleashFlags(features, config, context)
  }

  isEnabled (name) {
    if (!this.exists(name)) {
      return this.config.enabledDefault
    }
    return this.features.some(f => f.name === name && f.enabled)
  }

  exists (name) {
    return this.features.some(f => f.name === name)
  }

  isAllowIP (name) {
    const { feature, strategies } = this.getFeature(name)
    if (!feature || !feature?.enabled || !strategies) {
      return false
    }

    for (const strategy of strategies) {
      const ips = strategy.parameters.userIds
        .split(',')
        .map(s => s.trim())
      if (
        this.context.ip !== undefined &&
        this.context.ip.length > 0 &&
        ips.includes(this.context.ip)
      ) {
        return true
      }
    }
    return false
  }

  isAllowUser (name, user) {
    const { feature, strategies } = this.getFeature(name)
    if (!feature || !feature?.enabled || !strategies) {
      return false
    }

    for (const strategy of strategies) {
      const users = strategy.parameters.userIds
        .split(',')
        .map(s => s.trim())
      if (user.length > 0 && users.includes(user)) {
        return true
      }
    }
    return false
  }

  getFeature (
    name,
    strategyName = 'userWithId'
  ) {
    const feature = this.features.find(
      f => f.name === name
    )
    if (!feature) {
      return { feature: undefined, strategies: undefined }
    }
    const strategies = feature.strategies.filter(
      f => f.name === strategyName
    )
    if (!strategies) {
      return { feature, strategies: undefined }
    }
    return { feature, strategies }
  }
}
