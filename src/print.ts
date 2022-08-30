import { white, red, bold, green, italic, yellow } from 'colorette'
import { Consola } from 'consola'
import { UnleashFlagsData, UnleashFlagStrategy } from './runtime/plugin'

const printTitle = (consola: Consola) => {
  consola.log(white(bold('Feature Flags')))
}

const printFeatureFlag = (
  feature: UnleashFlagsData,
  consola: Consola
) => {
  let nameFeature: string =
    red(bold(`${feature.name} ✗ (Disabled): `)) +
    red((feature.description))
  if (feature.enabled) {
    nameFeature =
      green(italic(bold(`${feature.name} ✓ (Enabled): `) +
        green(feature.description)))
  }
  consola.log(`${white(bold('-'))} ${nameFeature}`)

  if (feature.strategies && feature.strategies[0].name !== 'default') {
    feature.strategies.forEach((strategy: UnleashFlagStrategy) => {
      const strategyName: string = strategy.name
      const parameters: { [p: string]: string } = strategy.parameters
      consola.log(yellow(`\xA0\xA0- Strategy: ${strategyName} `))
      Object.entries(parameters).forEach(([key, value]: [string, string]) => {
        consola.log(yellow(`\xA0\xA0\xA0\xA0· ${key}: ${value}`))
      })
    })
  }
}

export default (feature: UnleashFlagsData[], consola: Consola) => {
  consola.log('---------')
  printTitle(consola)
  if (!feature) {
    return
  }
  feature.forEach(f => printFeatureFlag(f, consola))
  consola.log('---------')
}
