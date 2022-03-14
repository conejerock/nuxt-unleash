import axios from 'axios'
import consola, { Consola } from 'consola'

const logger: Consola = consola.withTag('nuxt:unleash')

const fetchData = async (
  url: string,
  instanceId: string,
  environment?: string
) => {
  try {
    const { data } = await axios.get(`${url}/features`, {
      headers: {
        'UNLEASH-INSTANCEID': instanceId,
        ...(environment && { 'UNLEASH-APPNAME': environment })
      }
    })
    return data
  } catch (e) {
    logger.error(`Cannot fetch data from url ${url}`)
  }
}

export default async (url?: string, instanceId?: string, environment?: string) => {
  if (!url || !instanceId) {
    return undefined
  }
  return await fetchData(url, instanceId, environment).then(v => v.features).catch(() => undefined)
}
