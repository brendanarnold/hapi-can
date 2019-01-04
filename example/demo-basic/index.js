
const Hapi = require('hapi')
const Can = require('hapi-can')
const data = require('./data')
const { cannedItems } = require('./canned-service')

const server = Hapi.server({
  host: 'localhost',
  port: 8080
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
        const greeting = await data.canned.getGreeting(request)
        const favouriteThings = await data.canned.getFavouriteThings(request)
        const elapsed = (new Date()).getTime() - startTime
        return `
<p>${greeting}</p>
<p>${favouriteThings.food} and ${favouriteThings.toy}</p>
<p>Time taken ${elapsed}ms</p>`
      }
    },
    {
      method: 'GET',
      path: '/non-canned',
      handler: async (request, h) => {
        const startTime = (new Date()).getTime()
        const greeting = await data.standard.getGreeting()
        const favouriteThings = await data.standard.getFavouriteThings()
        const elapsed = (new Date()).getTime() - startTime
        return `
<p>${greeting}</p>
<p>${favouriteThings.food} and ${favouriteThings.toy}</p>
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
