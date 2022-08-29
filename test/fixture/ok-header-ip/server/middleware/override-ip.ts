// @ts-ignore
// eslint-disable-next-line no-undef
export default defineEventHandler((event: any) => {
  event.req.headers['CF-Connecting-IP'] = '56.56.56.56'
})
