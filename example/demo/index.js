const Hapi = require('hapi')

const server = Hapi.server({
  host: 'localhost',
  port: 8000
})

server.route([
  {
    method: 'get',
    path: '/',
    handler: async (request, h) => {
      return 'Hello demo'
    }
  }
])

const start = async () => {
  try {
    await server.start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Server running at: ' + server.info.uri)
}

start()
