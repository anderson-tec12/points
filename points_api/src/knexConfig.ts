import { knex as setupKnex, Knex as IKnex } from 'knex'


export const configKnex: IKnex.Config = {
  client: 'sqlite',
  connection: {
    filename: "./db/app.db",
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(configKnex)
