
const lifespan = {
  request: Symbol('request'),
  server: Symbol('server')
}

const when = {
  accessed: Symbol('accessed'),
  interval: Symbol('period')
}

const notFetched = Symbol('not-fetched')

module.exports = {
  notFetched,
  lifespan,
  when
}
