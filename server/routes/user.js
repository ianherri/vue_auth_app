require('dotenv').config()

const express = require('express')
const mongodb = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const auth = require('../middleware/auth')
const router = express.Router()

const uri = process.env.MONGODB_URI

router.use(auth)

router.get('/', async (req, res) => {
  const users = await loadUserCollection()
  const userid = req.session.userid
  console.log(userid)

  if (userid) {
    const user = await users.findOne({ _id: new ObjectId(userid) })
    res.send({ id: user._id, name: user.name, email: user.email })
  } else res.sendStatus(400)
})

router.post('/', async (req, res) => {
  const users = await loadUserCollection()
  const userid = req.session.userid
  const newName = req.body.name
  if (userid) {
    const query = { _id: new ObjectId(userid) }
    const updateDoc = { $set: { name: newName } }

    const result = await users.updateOne(query, updateDoc)
    console.log(result)
    res.sendStatus(200)
  } else res.sendStatus(400)
})

async function loadUserCollection() {
  const client = await mongodb.MongoClient.connect(uri, {
    useNewURLParser: true,
  })

  return client.db('vue-auth').collection('users')
}

module.exports = router
