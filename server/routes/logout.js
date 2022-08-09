require('dotenv').config()

const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
router.use(auth)
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
