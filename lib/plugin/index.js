const { repositoryItems } = require('../register')
const { notFetched } = require('../enums')
const log = require('../log')

/**
 * 
 * @param {Object} server
 * @param {Object} options
 * @param {bool} [options.disableCache]
 */
const register = async (server, options) => {
  server.ext({
    type: 'onPreStart',
    method: async (server) => {
      const serverCache = {}
      server.plugins['hapi-can'] = { 
        cache: serverCache,
        repositoryItems,
        pluginOptions: options
      }
      // Initialise the  cache
      for (const item of repositoryItems.server) {
        const value = await item.fetch({ server, options })
        const lastFetched = (new Date()).getTime()
        const lastUpdated = lastFetched
        serverCache[item.name] = {
          value,
          lastFetched,
          lastUpdated,
          isInvalidated: false
        }
      }
      // @todo Setup periodic invalidation
    }
  })

  server.ext({
    type: 'onRequest',
    method: async (request, h) => {
      const requestCache = {}
      repositoryItems.request.forEach(item => requestCache[item.name] = {
        value: notFetched,
        lastFetched: undefined,
        lastUpdated: undefined,
        isInvalidated: false
      })
      request.plugins['hapi-can'] = {
        cache: requestCache,
        h,
        requestTimer: log.startTimer()
      }
      return h.continue
    }
  })

  server.ext({
    type: 'onPreResponse',
    method: async (request, h) => {
      const { requestTimer } = request.plugins['hapi-can']
      requestTimer.log('Request process time')
      return h.continue
    }
  })
}


module.exports = {
  pkg: require('../../package.json'),
  register
}