require('dotenv').config()

const express = require('express')
const mongodb = require('mongodb')

const { ecdsaRecover, compareAddress } = require('../utils/ecdsaRecover')

const router = express.Router()
const uri = process.env.MONGODB_URI

// login user

router.post('/', async (req, res) => {
  console.log('made it here')
  const users = await loadUserCollection()
  const user = req.body
  console.log(user)
  const { address, signature, message } = user
  const query = { address: user.address }
  const matches = await users.findOne(query)
  const session = req.session

  const addressRecovered = await ecdsaRecover(signature, message)
  if (compareAddress(addressRecovered, address) && matches) {
    session.userid = matches._id.toString()
    res.send({ id: matches._id, name: matches.name, email: matches.email })
  } else if (compareAddress(addressRecovered, address) && !matches) {
    const newUser = await users.insertOne({
      name: address,
      email: '',
      password: '',
      password_confirm: '',
      signature: signature,
      address: address,
    })
    session.userid = newUser._id.toString()
    res.send({ id: newUser._id, name: newUser.name, email: newUser.email })
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
