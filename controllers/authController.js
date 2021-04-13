const { Users, UserProfiles } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const { email, password, name, username } = req.body
  try {
    const user = await Users.create({
      email: email,
      password: bcrypt.hashSync(password, 12),
      name: name,
      username: username
    })

    await UserProfiles.create({
      user_id: user.id
    })

    return res.send({ message: 'User was successfully registered' })
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}

const login = async (req, res) => {
  const email = req.body.email
  try {
    const user = await Users.findOne({
      where: { email: email }
    })

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: 'Invalid Password!'
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400
    })

    return res.set('x-access-token', token).send({
      id: user.id,
      username: user.username
    })
  } catch (err) {
    return res.status(404).send({ message: 'User not found' })
  }
}

module.exports = {
  login,
  register
}
