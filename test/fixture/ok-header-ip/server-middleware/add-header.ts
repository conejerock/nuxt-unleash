export default function (req, _, next) {
  req.headers['CF-Connecting-IP'] = '56.56.56.56'
  next()
}
