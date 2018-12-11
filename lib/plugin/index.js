const { repositoryItems } = require('../register')
const { notFetched } = require('../enums')

module.exports = {
  pkg: require('../../package.json'),
  register: async (server, options) => {

    server.ext({
      type: 'onPreStart',
      method: async (server) => {
        const serverCache = {}
        server.plugins['hapi-can'] = { 
          cache: serverCache,
          repositoryItems
        }
        // Initialise the  cache
        repositoryItems.server.forEach(item => serverCache[item.name] = notFetched)
        for (const item of repositoryItems.server) {
          if (serverCache[item.name] === notFetched) {
            serverCache[item.name] = await item.fetch({ server, options })
          }
        }
        // @todo Setup periodic invalidation
      }
    })

    server.ext({
      type: 'onRequest',
      method: async (request, h) => {
        const requestCache = {}
        repositoryItems.request.forEach(item => requestCache[item.name] = notFetched)
        request.plugins['hapi-can'] = {
          cache: requestCache
        }
        return h.continue
      }
    })
  }
}