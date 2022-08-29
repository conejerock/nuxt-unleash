import { defineNuxtPlugin } from "#app";
import { NuxtApp } from "nuxt/app";

export interface ModuleOptionsConfig {
  enabledDefault?: boolean;
  headerIP?: string;
}

export interface NuxtFeatureOptionsContext {
  ip?: string;
}

export interface UnleashFlagStrategy {
  name: string;
  parameters: { [p: string]: string };
}

export interface UnleashFlagsData {
  name: string;
  description: string;
  enabled: boolean;
  strategies: UnleashFlagStrategy[];
}

export class UnleashFlags {
  // eslint-disable-next-line no-useless-constructor
  private constructor(
    private features: UnleashFlagsData[],
    private config: ModuleOptionsConfig,
    private context: NuxtFeatureOptionsContext
  ) {}

  public static create({
    features,
    config,
    context,
  }: {
    features: UnleashFlagsData[];
    config?: ModuleOptionsConfig;
    context?: NuxtFeatureOptionsContext;
  }): UnleashFlags {
    return new UnleashFlags(features, config, context);
  }

  isEnabled(name: string): boolean {
    if (!this.exists(name)) {
      return this.config.enabledDefault;
    }
    return this.features.some(
      (f: UnleashFlagsData) => f.name === name && f.enabled
    );
  }

  exists(name: string) {
    return this.features.some((f: UnleashFlagsData) => f.name === name);
  }

  isAllowIP(name: string): boolean {
    const { feature, strategies } = this.getFeature(name);
    if (!feature || !feature?.enabled || !strategies) {
      return false;
    }

    for (const strategy of strategies) {
      const ips = strategy.parameters.userIds
        .split(",")
        .map((s: string) => s.trim());
      if (
        this.context.ip !== undefined &&
        this.context.ip.length > 0 &&
        ips.includes(this.context.ip)
      ) {
        return true;
      }
    }
    return false;
  }

  isAllowUser(name: string, user: string) {
    const { feature, strategies } = this.getFeature(name);
    if (!feature || !feature?.enabled || !strategies) {
      return false;
    }

    for (const strategy of strategies) {
      const users = strategy.parameters.userIds
        .split(",")
        .map((s: string) => s.trim());
      if (user.length > 0 && users.includes(user)) {
        return true;
      }
    }
    return false;
  }

  private getFeature(
    name: string,
    strategyName: string = "userWithId"
  ): {
    feature?: UnleashFlagsData;
    strategies?: UnleashFlagStrategy[];
  } {
    const feature = this.features.find(
      (f: UnleashFlagsData) => f.name === name
    );
    if (!feature) {
      return {
        feature: undefined,
        strategies: undefined,
      };
    }
    const strategies = feature.strategies.filter(
      (f: UnleashFlagStrategy) => f.name === strategyName
    );
    if (!strategies) {
      return {
        feature,
        strategies: undefined,
      };
    }
    return {
      feature,
      strategies,
    };
  }
}

const extractIp = (nuxtApp: NuxtApp, moduleOptions: ModuleOptionsConfig): string => {
  if (!moduleOptions.headerIP) {
    return nuxtApp.ssrContext.event.req.socket.remoteAddress
  }
  return nuxtApp.ssrContext.event.req.headers[moduleOptions.headerIP] as string
}

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const features: UnleashFlagsData[] = JSON.parse('<%= options.data %>')
  const config: ModuleOptionsConfig = JSON.parse('<%= options.config %>')
  const unleashFlags = UnleashFlags.create({
    features,
    config,
    context: {
      ip: extractIp(nuxtApp, config)
    }
  })
  return {
    provide: {
      unleash: unleashFlags
    }
  }
})
