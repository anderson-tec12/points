import { Knex } from 'knex'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { dateUtils } from '../utils/date'
import { PointsService } from '../services/points.service'

export function pointsRoutes(knex: Knex) {
  return async (app: FastifyInstance) => {
    app.get(
      '/:idUser',
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const paramsSchemaValidate = z.object({
            idUser: z.string(),
          })

          const { idUser } = paramsSchemaValidate.parse(request.params)
          const pointsService = new PointsService(knex)

          const monthCurrent = dateUtils.getMonthAndYear()
          const pointsUser = await pointsService.listPointsOnUser(
            idUser,
            monthCurrent,
          )

          const totalPointsInCurrentMonth = pointsUser.reduce((acc, point) => {
            acc += point.value
            return acc
          }, 0)

          reply.status(200).send({
            points: pointsUser,
            total: totalPointsInCurrentMonth,
            month: monthCurrent,
          })
        } catch (e) {
          reply.status(500).send({ error: e })
        }
      },
    )

    app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
      const insertPointsBodySchema = z.object({
        description: z.string(),
        userId: z.string(),
        value: z.coerce.number(),
      })

      const { description, userId, value } = insertPointsBodySchema.parse(
        request.body,
      )

      const pointsService = new PointsService(knex)

      const point = await pointsService.insert({
        description,
        userId,
        value,
        month: dateUtils.getMonthAndYear(),
      })

      // console.log({ point })

      reply.status(200).send(point)
    })
  }
}
