import { Knex } from 'knex'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserService } from '../services/users.service'

export function usersRoutes(knex: Knex) {
  return async (app: FastifyInstance) => {
    app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const createUserBodySchema = z.object({
          name: z.string(),
        })

        const { name } = createUserBodySchema.parse(request.body)

        const userService = new UserService(knex)

        await userService.insertUser(name)

        reply.status(200).send()
      } catch {
        reply.status(404).send({ message: 'Error' })
      }
    })

    app.post('/list', async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const createUsersBodySchema = z.object({
          usersName: z.string().array(),
        })

        const { usersName } = createUsersBodySchema.parse(request.body)

        const userService = new UserService(knex)

        await userService.usersInsertList(usersName)()

        reply.status(201)
      } catch (e) {
        console.log('Error in process List user names')
        console.log({ e })

        reply.status(500)
      }
    })

    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
      const userService = new UserService(knex)

      const users = await userService.listUsers()

      reply.status(200).send({ users })
    })
  }
}
