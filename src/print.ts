import { NuxtOptions } from '@nuxt/types'
import { white, red, bold, green, italic, yellow } from 'colorette'
import { UnleashFlagsData, UnleashFlagStrategy } from './types'

const printTitle = (badgeMessages: string[]) => {
  badgeMessages.push(white(bold('Feature Flags')))
}

const printFeatureFlag = (
  feature: UnleashFlagsData,
  badgeMessages: string[]
) => {
  let nameFeature: string =
    red(bold(`${feature.name} ✗ (Disabled): `)) +
    red((feature.description))
  if (feature.enabled) {
    nameFeature =
      green(italic(bold(`${feature.name} ✓ (Enabled): `) +
      green(feature.description)))
  }
  badgeMessages.push(`${white(bold('-'))} ${nameFeature}`)

  if (feature.strategies && feature.strategies[0].name !== 'default') {
    feature.strategies.forEach((strategy: UnleashFlagStrategy) => {
      const strategyName: string = strategy.name
      const parameters: { [p: string]: string } = strategy.parameters
      badgeMessages.push(yellow(`\xA0\xA0- Strategy: ${strategyName} `))
      Object.entries(parameters).forEach(([key, value]: [string, string]) => {
        badgeMessages.push(yellow(`\xA0\xA0\xA0\xA0· ${key}: ${value}`))
      })
    })
  }
}

export default (feature: UnleashFlagsData[], options: NuxtOptions) => {
  if (!feature) {
    return
  }
  const badgeMessages: string[] = options.cli.badgeMessages

  printTitle(badgeMessages)
  feature.forEach(f => printFeatureFlag(f, badgeMessages))
  badgeMessages.push('')
}
