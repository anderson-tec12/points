import { app } from './app'
import { pointsRoutes } from './controller/points'
import { usersRoutes } from './controller/users'
import { knex } from './knexConfig'

import cors from '@fastify/cors'

app.register(cors, {
  allowedHeaders: '*',
})

app.register(usersRoutes(knex), { prefix: 'users' })
app.register(pointsRoutes(knex), { prefix: 'points' })

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then((resp) => {
    console.info(`This is server running in ${resp}`)
  })
