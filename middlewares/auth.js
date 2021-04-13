const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) return res.status(400).send('No auth headers provided')

  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) return res.status(403).send('Access denied')

    req.userId = payload.id
    next()
  })

}

module.exports = auth
