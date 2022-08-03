require('dotenv').config()

const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()
const uri = process.env.MONGODB_URI

// login user

router.post('/', async (req, res) => {
  const users = await loadUserCollection()
  const user = req.body
  const query = { email: user.email }
  const matches = await users.findOne(query)

  if (matches && matches.password === user.password) {
    const session = req.session
    session.userid = matches._id.toString()
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

async function loadUserCollection() {
  const client = await mongodb.MongoClient.connect(uri, {
    useNewURLParser: true,
  })

  return client.db('vue-auth').collection('users')
}

module.exports = router
