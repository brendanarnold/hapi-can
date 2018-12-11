
const Hapi = require('hapi')
const Can = require('hapi-can')
const { item, cannedItems } = require('./canned-data')


const server = Hapi.server({
  host: 'localhost',
  port: 8000
})

const start = async () => {
  

  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const greeting = await Can.from(request, h).get(item.greeting)
      const question = await Can.from(request, h).get(item.question)
      const user = await Can.from(request, h).get(item.user)
      return `${greeting}, ${question} (Logged in as ${user})`
    }
  })

  await server.register(Can, {})
  Can.register(cannedItems)

  try {
    await server.start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Server running at: ' + server.info.uri)
}

start()