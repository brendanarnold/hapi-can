const { respositoryItems } = require('../register')
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
        for (const item of respositoryItems.server) {
          if (serverCache[item.name] === notFetched) {
            serverCache[item.name] = await item.fetch({ server, options })
          }
        }
        // @todo Setup periodic invalidation
      }
    })

    server.ext({
      type: 'onRequest',
      method: (request, h) => {
        const requestCache = {}
        request.plugins['hapi-can'] = {
          cache: requestCache
        }
        repositoryItems.request.forEach(item => requestCache[item.name] = notFetched)
      }
    })
  }
}