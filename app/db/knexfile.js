module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      database: 'pz_graphql',
      user: 'miguel',
      password: 'secret'
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
