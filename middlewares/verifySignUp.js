const { Users } = require('../models')

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  Users.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Username is already in use'
        })
        return
      }

      Users.findOne({
        where: {
          email: req.body.email
        }
      })
        .then((user) => {
          if (user) {
            res.status(400).send({
              message: 'Email is already in use'
            })
            return
          }

          next()
        })
    })
}

module.exports = { checkDuplicateUsernameOrEmail }
