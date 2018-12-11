
const Can = require('hapi-can')
const myService = require('./service')

const item = {
  user: Symbol('user'),
  greeting: Symbol('greeting'),
  question: Symbol('question')
}

const cannedItems = [
  {
    name: item.user,
    lifespan: Can.lifespan.request,
    fetch: async ({ request, h }) => {
      return myService.getUser()
    }
  },
  {
    name: item.greeting,
    lifespan: Can.lifespan.request,
    fetch: async ({ request, h }) => {
      const user = await Can.from(request, h).get(item.user)
      return myService.getGreeting(user)
    }
  },
  {
    name: item.question,
    lifespan: Can.lifespan.request,
    fetch: async ({ request, h }) => {
      const user = await Can.from(request, h).get(item.user)
      return myService.getQuestion(user)
    }
  }
]

module.exports = {
  item,
  cannedItems
}