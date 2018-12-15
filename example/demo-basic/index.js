
const Hapi = require('hapi')
const Can = require('hapi-can')
const { item, cannedItems } = require('./canned-data')
const service = require('./service')

const server = Hapi.server({
  host: 'localhost',
  port: 8000
})

const start = async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: async (request, h) => {
        return `
<html>
  <head>
    <title>Demo of Hapi-Can</title>
  </head>
  <body>
    <div style="display:inline-block">
      <iframe src="/canned" align="left"></iframe>
    </div>
    <div style="display:inline-block">
      <iframe src="/non-canned" align="right"></iframe>
    </div>
  </body>
</html>`
      }
    },
    {
      method: 'GET',
      path: '/canned',
      handler: async (request, h) => {
        const startTime = (new Date()).getTime()
        const greeting = await Can.from(request).get(item.greeting)
        const question = await Can.from(request).get(item.question)
        const user = await Can.from(request).get(item.user)
        const elapsed = (new Date()).getTime() - startTime
        return `
<p>${greeting}</p>
<p>${question}</p>
<p>Time taken ${elapsed}ms</p>`
      }
    },
    {
      method: 'GET',
      path: '/non-canned',
      handler: async (request, h) => {
        const startTime = (new Date()).getTime()
        const user = await service.getUser()
        const greeting = await service.getGreeting(user)
        const question = await service.getQuestion(user)
        const elapsed = (new Date()).getTime() - startTime
        return `
<p>${greeting}</p>
<p>${question}</p>
<p>Time taken ${elapsed}ms</p>`
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
