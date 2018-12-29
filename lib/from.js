
const { notFetched } = require('./enums')
const log = require('./log')

/**
 * 
 * @param {Server|Request} obj A Hapi server or request object decorated with the Hapi-Can plugin
 */
const from = (obj) => {
  const isRequest = !!obj.server // server is on the request object
  const request = isRequest ? obj : undefined
  const server = isRequest ? obj.server : obj
  const { cache } = isRequest ? request.plugins['hapi-can'] : server.app['hapi-can']
  const repositoryItems = isRequest 
    ? server.plugins['hapi-can'].repositoryItems.request
    : server.plugins['hapi-can'].repositoryItems.server
  const h = isRequest
    ? request.plugins['hapi-can'].h
    : undefined
  const options = isRequest 
    ? h.realm.pluginOptions
    : server.app['hapi-can'].pluginOptions

  const get = async (name, ...extraArgs) => {
    if (!name) {
      throw new Error('get requires a name to lookup')
    }
    const timer = log.startTimer()
    const { isInvalidated } = cache[name]
    if (cache[name].value === notFetched ||
      options.disableCache ||
      isInvalidated) {
      const item = repositoryItems.find(item => item.name === name)
      const args = isRequest ? { request, h, options } : { server, options }
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
    return cache[name].lastFetched
  }

  const lastUpdated = (name) => {
    return cache[name].lastFetched
  }

  const isInvalidated = (name) => {
    return cache[name].isInvalidated
  }

  const invalidate = (name, invalidate = true) => {
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
    return cache[name].fetchTime
  }

  const set = (name, value) => {
    cache[name].isInvalidated = false
    cache[name].value = value
    cache[name].lastUpdated = (new Date()).getTime()
  }

  const generateReport = () => {
    const items = []
    for (let key of Object.getOwnPropertySymbols(cache)) {
      const item = cache[key]
      items.push({
        name: key,
        fetchAccesses: item.fetchAccesses,
        cacheAccesses: item.cacheAccesses,
        fetchTime: item.fetchTime
      })
    }
    let fetchTime = 0, timeSaved = 0, fetchAccesses = 0, cacheAccesses = 0
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
