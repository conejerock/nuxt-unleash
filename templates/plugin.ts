import consola from "consola";
import UnleashFlags from "./UnleashFlags";

const logger = consola.withTag("nuxt:unleash");



const extractIP = ({ ssrContext, store }, headerIp) => {

  if (!store) {
    logger.warn(
      "Vuex is not active in nuxt project. Some functionalities could be disabled"
    );
    return undefined;
  }

  if (process.server) {
    let ip = ssrContext.req.socket.remoteAddress;
    if (headerIp) {
      ip = ssrContext.req.headers[headerIp] || "";
    }
    store.state.ip = ip;
    return ip;
  }

  return store.state.ip;
};

function plugin(ctx, inject) {
  const FEATURES = JSON.parse('<%= options.data %>');
  const CONFIG = JSON.parse('<%= options.config %>');
  const ip = extractIP(ctx, CONFIG.headerIp);
  const unleashFlags = UnleashFlags.create({
    features: FEATURES,
    config: CONFIG,
    context: { ip }
  });

  inject("unleash", unleashFlags);
  ctx.app.unleash = unleashFlags;
}

export { plugin };
export default plugin;
