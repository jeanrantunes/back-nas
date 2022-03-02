import path from 'path'
import { DATABASE } from '../config'
export const development = {
  client: 'pg',
  connection: DATABASE,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
}

export const production = {
  client: 'pg',
  connection: DATABASE,
  // connection: {
  //   host: 'mysql669.umbler.com',
  //   port: 41890,
  //   database: 'nas-db',
  //   user: 'jeanrantunes',
  //   password: 'Fohu0059'
  // },
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
}

export const test = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'db_test.sqlite3')
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
  // useNullAsDefault: true
  // client: 'pg',
  // // connection: DATABASE,
  // connection: 'postgres://jeanrantunes@localhost:5432/nas',
  // migrations: {
  //   directory: path.resolve(__dirname, 'migrations')
  // }
}

const knex = {
  development,
  production,
  test
}

export default knex
