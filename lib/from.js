
const { notFetched } = require('./enums')
const log = require('./log')

/**
 * 
 * @param {Server|Request} obj A Hapi server or request object decorated with the Hapi-Can plugin
 */
const from = (obj) => {
  const isRequest = !!obj.server // server is on the request object
  const { cache } = obj.plugins['hapi-can']
  const request = isRequest ? obj : undefined
  const server = isRequest ? obj.server : obj
  const repositoryItems = isRequest 
    ? request.server.plugins['hapi-can'].repositoryItems.request
    : server.plugins['hapi-can'].repositoryItems.server
  const h = isRequest
    ? request.plugins['hapi-can'].h
    : undefined
  const options = isRequest 
    ? h.realm.pluginOptions
    : server.plugins['hapi-can'].pluginOptions
  return {
    get: async (name, ...extraArgs) => {
      const timer = log.startTimer()
      if (cache[name] === notFetched || options.disableCache) {
        const item = repositoryItems.find(item => item.name === name)
        const args = isRequest ? { request, h, options } : { server, options }
        cache[name] = await item.fetch(args, ...extraArgs)
      }
      timer.log('fetch request')
      return cache[name]
    }
  }
}

module.exports = {
  from
}