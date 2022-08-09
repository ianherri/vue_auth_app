require('dotenv').config()

const express = require('express')
const mongodb = require('mongodb')
const auth = require('../middleware/auth')

const router = express.Router()
router.use(auth)

const uri = process.env.MONGODB_URI

// login user

router.post('/', async (req, res) => {
  const messagesCollection = await loadMessageCollection()
  const userid = req.session.userid
  const message = {
    text: req.body.text,
    reply: req.body.reply,
    parentId: req.body.parentId,
    username: req.body.username,
    userid: userid,
    timestamp: new Date(),
  }

  if (userid) {
    messagesCollection.insertOne(message)
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

router.get('/', async (req, res) => {
  const messagesCollection = await loadMessageCollection()
  const userid = req.session.userid
  // if authenticated
  const messagesArray = await messagesCollection.find().toArray()
  if (userid) {
    res.send(messagesArray)
  } else {
    res.sendStatus(400)
  }
})

async function loadMessageCollection() {
  const client = await mongodb.MongoClient.connect(uri, {
    useNewURLParser: true,
  })

  return client.db('vue-auth').collection('messages')
}

module.exports = router
