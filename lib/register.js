
const { lifespan } = require('./enums')

const repositoryItems = {
  request: [],
  server: []
}

const register = async (items) => {
  // @todo Validate the item
  const arrItems = Array.isArray(items) ? items : [items]
  arrItems.map(item => {
    if (item.lifespan === lifespan.request) {
      repositoryItems.request.push(item)
    }
    if (item.lifespan === lifespan.server) {
      repositoryItems.server.push(item)
    }
  })
}

module.exports = {
  register,
  repositoryItems
}
