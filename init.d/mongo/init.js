/* eslint-disable */

/**
 * 1. create custom user
 * 2. create collection (Before MongoDB can save your new database, a collection name must also be specified at the time of creation.)
 */
db.createUser({
  user: 'egg_dockerizer',
  pwd: 'egg_dockerizer',
  roles: [
    {
      role: 'readWrite',
      db: 'egg_dockerizer'
    }
  ]
})

db.egg_dockerizer.insert({
  egg_dockerize: 'egg_dockerizer'
})
