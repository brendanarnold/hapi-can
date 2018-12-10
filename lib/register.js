
const { lifespan } = require('./enums')

const repositoryItems = {
  request: [],
  server: []
}

const register = async (repositoryItem) => {
  // @todo Validate the item
  if (repositoryItem.lifespan === lifespan.request) {
    repositoryItems.request.push(repositoryItem)
  }
  if (repositoryItem.lifespan === lifespan.server) {
    repositoryItems.server.push(repositoryItem)
  }
}

module.exports = {
  register,
  repositoryItems
}
