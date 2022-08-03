require('dotenv').config()

const express = require('express')
const mongodb = require('mongodb')
const ObjectId = require('mongodb').ObjectId

const router = express.Router()
const uri = process.env.MONGODB_URI

// login user

router.get('/', async (req, res) => {
  const users = await loadUserCollection()
  const userid = req.session.userid
  console.log(userid)

  if (userid) {
    const user = await users.findOne({ _id: new ObjectId(userid) })
    res.send({ id: user._id, name: user.name, email: user.email })
  } else res.sendStatus(400)
})

async function loadUserCollection() {
  const client = await mongodb.MongoClient.connect(uri, {
    useNewURLParser: true,
  })

  return client.db('vue-auth').collection('users')
}

module.exports = router
