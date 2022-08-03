require('dotenv').config()

const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()
const uri = process.env.MONGODB_URI

// create new user

router.post('/', async (req, res) => {
  const users = await loadUserCollection()
  const user = req.body
  const query = { email: user.email }
  const exists = await users.findOne(query)

  if (exists) {
    res.sendStatus(400)
  } else {
    await users.insertOne(user)
    res.sendStatus(200)
  }
})

router.get('/', (req, res) => {
  console.log(req)
  res.sendStatus(200)
})

async function loadUserCollection() {
  const client = await mongodb.MongoClient.connect(uri, {
    useNewURLParser: true,
  })

  return client.db('vue-auth').collection('users')
}

module.exports = router
