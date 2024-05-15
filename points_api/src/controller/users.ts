import crypto from 'node:crypto'

import { Knex } from 'knex'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export function usersRoutes(knex: Knex) {
  return async (app: FastifyInstance) => {
    app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const createUserBodySchema = z.object({
          name: z.string(),
        })

        const { name } = createUserBodySchema.parse(request.body)

        await knex('users').insert({
          id: crypto.randomUUID(),
          name,
        })

        reply.status(200).send()
      } catch {
        reply.status(404).send({ message: 'Error' })
      }
    })
  }
}
