```
const data = {
  token: Symbol('token'),
  user: Symbol('user')
}
```

```
[
  {
    name: data.token,
    lifespan: lifespan.request,
    fetch: async ({ request }) => {
      return activeDirectory.getToken()
    }
  },
  {
    name: data.user,
    lifespan: lifespan.request,
    fetch: async ({ request }, query) => {
      const token = await Can.from(request).get(data.token)
      return dynamics.readContact(token, query)
    }
  }
]
```

Example two layer cache

```
const data = {
  token: Symbol('token')
  user: Symbol('user'),
  session: {
    user: Symbol('session-user')
  },
  database: {
    user: Symbol('database-user')
  } 
}
```

```
[
  {
    name: data.token,
    lifespan: Can.lifespan.request,
    fetch: async ({ request }) => {
      return activeDirectory.getToken()
    }
  },
  {
    name: data.user,
    lifespan: Can.lifespan.request,
    fetch: async ({ request }, query) => {
      return await Can.from(request).get(data.session.user, query)
        || await Can.from(request).get(data.database.user, query)
    }
  },
  {
    name: data.session.user,
    lifespan: Can.lifespan.request,
    fetch: async ({ request }, query) => {
      return mongodb.fetch(query)
    }
  },
  {
    name: data.database.user,
    lifespan: Can.lifespan.request,
    fetch: async ({ request }, query) => {
      const token = await Can.from(request).get(data.token)
      return dynamics.readContact(token, query)
    }
  }
]
```

Example server lifespan

```
const data = {
  token: Symbol('token')
  tacs: Symbol('tacs')
}
```

```
[
  {
    name: data.token,
    lifespan: Can.lifespan.server,
    fetch: async ({ server }) => {
      return activeDirectory.getToken()
    }
  },
  {
    name: data.tacs,
    lifespan: Can.lifespan.server,
    fetch: async ({ server }) => {
      let token = await Can.from(server)
        .get(data.token)
        .invalidateIf(token => {
          token.expiryTime < new Date()
        })
      return dynamics.readTermsAndConditions(token)
    },
    invalidate: [
      {
        when: Can.when.accessed,
        onlyIf: async ({ server }) => Can.from(server)
            .get(data.token)
            .lastFetched() > 5000
      },
      {
        when: Can.when.interval,
        interval: 10000
      }
    ]
  }
]
```

Requirements:
  - Familiar syntax to Hapi developers
  - Multi layered fetching e.g. from cache, then database
  - Can invalidate each layer programatically
  - Last for the lifespan of a request or the app lifespan
  - Work well with plugins, can be private to plugin or made accessible throughout app
  - Testable
  - Can be modified later by wrappers
  - Works with auto complete
