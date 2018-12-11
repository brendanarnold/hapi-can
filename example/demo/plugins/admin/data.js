const Can = require('hapi-can')

const data = {
  permissions: Symbol('permissions')
}

const repositoryItems = [
  {
    name: data.permissions,
    lifespan: Can.lifespan.request,
    fetch: async ({ request, h }) => {
      // Fake a request
      return new Promise((resolve, reject) => {
        setTimeout(() => { resolve('admin') })
      })
    }
  }
]

module.exports = {
  data,
  repositoryItems
}
