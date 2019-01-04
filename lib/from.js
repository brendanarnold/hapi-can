
const { notFetched } = require('./enums')
const log = require('./log')

const _resolveCache = (requestCache, serverCache, name) => {
  if (!name) {
    throw new Error('Requires a valid name to lookup')
  }
  if (typeof requestCache[name] !== 'undefined') {
    return requestCache
  } else if (typeof serverCache[name] !== 'undefined') {
    return serverCache
  } else {
    throw Error('Could not find specified name in Can cache')
  }
}

/**
 * @param {Request} request A Hapi request object decorated with the Hapi-Can plugin
 */
const from = (request) => {
  const {
    repositoryItems,
    cache: serverCache,
    pluginOptions: canOptions
  } = request.server.app['hapi-can']
  const {
    h,
    cache: requestCache
  } = request.plugins['hapi-can']
  const get = async (name, ...extraArgs) => {
    const cache = _resolveCache(requestCache, serverCache, name)
    const timer = log.startTimer()
    const { isInvalidated } = cache[name]
    if (cache[name].value === notFetched ||
      canOptions.disableCache ||
      isInvalidated) {
      const item = repositoryItems.find(item => item.name === name)
      const args = { request, h, canOptions }
      const value = await item.fetch(args, ...extraArgs)
      const lastUpdated = (new Date()).getTime()
      const lastFetched = lastUpdated
      const fetchTime = timer.elapsed()
      const cacheAccesses = cache[name].cacheAccesses
      const fetchAccesses = cache[name].fetchAccesses + 1
      cache[name] = {
        value,
        lastUpdated,
        lastFetched,
        isInvalidated: false,
        fetchTime,
        cacheAccesses,
        fetchAccesses
      }
    } else {
      cache[name].cacheAccesses += 1
    }
    return cache[name].value
  }

  const lastFetched = (name) => {
    const cache = _resolveCache(requestCache, serverCache, name)
    return cache[name].lastFetched
  }

  const lastUpdated = (name) => {
    const cache = _resolveCache(requestCache, serverCache, name)
    return cache[name].lastFetched
  }

  const isInvalidated = (name) => {
    const cache = _resolveCache(requestCache, serverCache, name)
    return cache[name].isInvalidated
  }

  const invalidate = (name, invalidate = true) => {
    const cache = _resolveCache(requestCache, serverCache, name)
    if (invalidate) {
      cache[name].isInvalidated = true
    }

    const includingDependencies = () => {
      const deps = repositoryItems[name].dependencies
      if (deps && invalidate) {
        deps.forEach(dep => from(request).invalidate(dep).includingDependencies())
      }
      return {
        get: (...extraArgs) => get(name, ...extraArgs)
      }
    }

    return {
      includingDependencies,
      get: (...extraArgs) => get(name, ...extraArgs)
    }
  }

  const fetchTime = (name) => {
    const cache = _resolveCache(requestCache, serverCache, name)
    return cache[name].fetchTime
  }

  const set = (name, value) => {
    const cache = _resolveCache(requestCache, serverCache, name)
    cache[name].isInvalidated = false
    cache[name].value = value
    cache[name].lastUpdated = (new Date()).getTime()
  }

  const generateReport = () => {
    const items = []
    for (let key of Object.getOwnPropertySymbols(requestCache)) {
      const item = requestCache[key]
      items.push({
        name: key,
        fetchAccesses: item.fetchAccesses,
        cacheAccesses: item.cacheAccesses,
        fetchTime: item.fetchTime
      })
    }
    let fetchTime = 0
    let timeSaved = 0
    let fetchAccesses = 0
    let cacheAccesses = 0
    for (let item of items) {
      fetchTime += item.fetchTime * item.fetchAccesses
      timeSaved += item.fetchTime * item.cacheAccesses
      fetchAccesses += item.fetchAccesses
      cacheAccesses += item.cacheAccesses
    }
    return {
      items,
      totals: {
        fetchTime,
        timeSaved,
        fetchAccesses,
        cacheAccesses
      }
    }
  }

  return {
    get,
    set,
    invalidate,
    isInvalidated,
    lastFetched,
    lastUpdated,
    fetchTime,
    generateReport
  }
}

module.exports = {
  from
}
