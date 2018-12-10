
const { notFetched } = require('./enums')

const from = (obj) => {
  const { cache } = obj.plugins['hapi-can']
  const repositoryItems = obj.plugins['hapi-can'].repositoryItems || obj.server.plugins['hapi-can'].repositoryItems
  return {
    get: async (name, ...args) => {
      if (cache[name] === notFetched) {
        const item = repositoryItems.find(item => item.name === name)
        // @todo Check if right obj is passed in
        cache[name] = await item.fetch(obj, ...args)
      }
      return cache(name)
    }
  }
}

module.exports = {
  from
}