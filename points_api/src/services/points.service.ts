import crypto from 'node:crypto'
import { Knex } from 'knex'

interface insertProps {
  description: string
  userId: string
  value: number
  month: string
}

interface PointsProps {
  id: string
  user_id: string
  value: number
  month: string
  message: string
  created_at: Date
}

interface ValuesSelect {
  points: PointsProps[]
  userName: string
  userId: string
}

export class PointsService {
  private table = 'points'

  constructor(private driver: Knex) {
    // none
  }

  async insert({ description, month, userId, value }: insertProps) {
    return await this.driver(this.table).insert({
      id: crypto.randomUUID(),
      message: description,
      month,
      user_id: userId,
      value,
    })
  }

  async listPointsOnUser(userId: string, month: string) {
    return await this.driver(this.table)
      .where({
        user_id: userId,
        month,
      })
      .select('*')
  }

  async resumeAll(users: { id: string; name: string }[], month: string) {
    return async () => {
      const values: ValuesSelect[] = []
      for (const user of users) {
        const points = await this.driver(this.table)
          .where({
            user_id: user.id,
            month,
          })
          .select('*')

        values.push({
          userName: user.name,
          points,
          userId: user.id,
        })
      }

      return values
    }
  }
}
