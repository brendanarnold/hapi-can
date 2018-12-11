
const { notFetched } = require('./enums')

const from = (obj, h = undefined) => {
  const { cache } = obj.plugins['hapi-can']
  const isRequest = !!h
  const repositoryItems = (obj.server || obj).plugins['hapi-can'].repositoryItems
  return {
    get: async (name, ...extraArgs) => {
      if (cache[name] === notFetched) {
        const item = (isRequest ? repositoryItems.request : repositoryItems.server).find(item => item.name === name)
        const args = isRequest ? { request: obj, h } : { server: obj }
        cache[name] = await item.fetch(args, ...extraArgs)
      }
      return cache[name]
    }
  }
}

module.exports = {
  from
}