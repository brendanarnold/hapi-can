
const Hapi = require('hapi')
const data = require('./data')
const { cannedItems } = require('./canned-service')
const Can = require('hapi-can')

const server = Hapi.server({
  host: 'localhost',
  port: 8081
})

const start = async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: async (request, h) => {
        const startTime = (new Date()).getTime()
        const user = await data.getUser(server)
        const elapsed = (new Date()).getTime() - startTime
        return `
<html>
  <head>
    <title>Demo of Hapi-Can with interval invalidation</title>
  </head>
  <body>
  <p>Hey ${user.name}!</p>
  <p>Time taken ${elapsed}ms</p>
  </body>
</html>`
      }
    }
  ])

  await server.register({
    plugin: Can.plugin,
    options: {
      disableCache: false
    }
  })
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
