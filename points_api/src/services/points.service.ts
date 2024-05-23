import crypto from 'node:crypto'
import { Knex } from 'knex'

interface insertProps {
  description: string
  userId: string
  value: number
  month: string
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
    console.log(userId, month)
    return await this.driver(this.table)
      .where({
        user_id: userId,
        month,
      })
      .select('*')
  }
}
