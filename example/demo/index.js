const Hapi = require('hapi')

const blog = require('./plugins/blog')
const admin = require('./plugins/admin')

const server = Hapi.server({
  host: 'localhost',
  port: 8000
})

await server.register([
  blog.plugin,
  admin.plugin
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
