const mongoose = require('mongoose')
const User = require('../models/user')
const userData = require('../data/user.json')
const crypto = require('crypto')
const dbpath = process.env.MONGODB_URI || 'mongodb://localhost/trip-planer'

mongoose.connect(dbpath, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('error:: failed to connect to mongodb.')
})

db.once('open', () => {
  console.log('success:: connected to mongodb!')
  db.dropCollection('users')
    .then(() => {
      console.log('successfully dropping users collection')
      const users = userData.data.map(user => ({
        ...user,
        password: crypto.createHash('md5').update(user.password, 'utf-8').digest('hex')
      }))

      User.insertMany(users)
        .then(users => {
          console.log('successfully writing seed data')
          process.exit(0)
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
      console.log('fail to drop users collection')
    })
})
