module.exports = (req, res, next) => {
  if (!req.session.userid) {
    console.log(`from middleware -- not authorized, redirecting to login`)
    res.sendStatus(401)
  } else {
    console.log('from middleware -- authorized, you can use this service')
  }
  next()
}
