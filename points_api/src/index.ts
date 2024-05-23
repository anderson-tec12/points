import { app } from './app'
import { pointsRoutes } from './controller/points'
import { usersRoutes } from './controller/users'
import { knex } from './knexConfig'

app.register(usersRoutes(knex), { prefix: 'users' })
app.register(pointsRoutes(knex), { prefix: 'points' })

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then((resp) => {
    console.log(`This is server running in ${resp}`)
  })
