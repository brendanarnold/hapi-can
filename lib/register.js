
const repositoryItems = []

const register = async (items) => {
  // @todo Validate the items
  const arrItems = Array.isArray(items) ? items : [items]
  arrItems.forEach(item => repositoryItems.push(item))
}

module.exports = {
  register,
  repositoryItems
}
