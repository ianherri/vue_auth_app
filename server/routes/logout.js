require('dotenv').config()

const express = require('express')

const router = express.Router()

// logout endpoint to destroy session

router.get('/', (req, res) => {
  const session = req.session
  console.log(session)
  session.destroy((err) => {
    if (err) {
      console.log(err)
    }
    res.clearCookie('connect.sid')
    res.sendStatus(200)
  })
})

module.exports = router
