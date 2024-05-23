import crypto from 'node:crypto'
import { Knex } from 'knex'

export class UserService {
  private table = 'users'

  constructor(private driver: Knex) {
    // none
  }

  usersInsertList(list: string[]) {
    return async () => {
      for (const user of list) {
        console.log(user)
        await this.driver(this.table).insert({
          id: crypto.randomUUID(),
          name: user,
        })
      }
    }
  }

  async insertUser(name: string) {
    await this.driver(this.table).insert({
      id: crypto.randomUUID(),
      name,
    })
  }

  async listUsers() {
    return await this.driver(this.table).select()
  }
}
