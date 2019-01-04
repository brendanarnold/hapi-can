const { repositoryItems } = require('../register')
const { notFetched } = require('../enums')
const log = require('../log')
const { from } = require('../from')
const { when } = require('../enums')

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
      server.app['hapi-can'] = { 
        cache: serverCache,
        repositoryItems,
        pluginOptions: options
      }
      // Initialise the  cache
      for (const item of repositoryItems.server) {
        const timer = log.startTimer()
        const value = await item.fetch({ server, options })
        const fetchTime = timer.elapsed()
        const lastFetched = (new Date()).getTime()
        const lastUpdated = lastFetched
        serverCache[item.name] = {
          value,
          lastFetched,
          lastUpdated,
          isInvalidated: false,
          fetchTime,
          cacheAccesses: 0,
          fetchAccesses: 1
        }
      }
      // Setup periodic invalidation using setIntervals
      repositoryItems.server
        .filter(item => item.invalidate && item.invalidate.length)
        .forEach(item => {
          item.invalidate
            .filter(condition => condition.when === when.interval)
            .forEach(condition => setInterval(async () => {
              if (condition.onlyIf && !(await condition.onlyIf({ server }))) {
                return
              }
              from(server).invalidate(item.name)
            }, condition.interval))
        })
      
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
        isInvalidated: false,
        fetchTime: 0,
        cacheAccesses: 0,
        fetchAccesses: 0
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
      const { disableCache } = h.realm.pluginOptions
      let msg
      if (disableCache) {
        msg = `Request process time [CACHE DISABLED]`
      } else {
        const report = from(request).generateReport()
        msg = `${report.totals.cacheAccesses} of ${report.totals.cacheAccesses + report.totals.fetchAccesses} accesses cached, ~${report.totals.timeSaved}ms saved, total request time`
      }
      requestTimer.log(msg)
      return h.continue
    }
  })
}


module.exports = {
  pkg: require('../../package.json'),
  register
}
