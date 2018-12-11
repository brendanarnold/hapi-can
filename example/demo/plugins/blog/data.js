
const Can = require('hapi-can')

const data = {
  posts: Symbol('posts'),
  user: Symbol('user')
}

const repositoryItems = [
  {
    name: posts,
    lifespan: Can.lifespan.request,
    fetch: async ({ request, h }) => {

    }
  },
  {
    name: user,
    lifespan: Can.lifespan.request,
    fetch: async ({ request, h }) => {
      
    }
  }
]

module.exports = {
  data,
  repositoryItems
}
