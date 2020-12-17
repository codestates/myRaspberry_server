const dotenv = require('dotenv').config()

module.exports = {
  type: 'mysql',
  host: process.env.HOST,
  port: 3306,
  username: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: ['dist/entity/*.js'],
  subscribers: ['dist/subscriber/*.js'],
  migrations: ['dist/migration/*.js'],
  cli: {
    entitiesDir: 'dist/entity',
    migrationsDir: 'dist/migration',
    subscribersDir: 'dist/subscriber',
  },
}
