import { app } from './app'
import { usersRoutes } from './controller/users'
import { knex } from './knexConfig'

app.register(usersRoutes(knex), { prefix: 'users' })

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then((resp) => {
    console.log(`This is server running in ${resp}`)
  })
