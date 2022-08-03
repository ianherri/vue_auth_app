require('dotenv').config()

const express = require('express')

const router = express.Router()

// requests on url
router.get('/', (req, res) => {
  const session = req.session
  if (session.userid) {
    res.sendStatus(200)
  } else res.sendStatus(401)
})

module.exports = router
