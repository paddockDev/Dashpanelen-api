const { Users, UserProfiles, UserServices } = require('../models')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const callback = async (req, res) => {
  const code = req.query.code

  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code
  }

  const header = {
    headers: {
      Accept: 'application/json'
    }
  }

  const accessToken = await axios.post(`https://github.com/login/oauth/access_token`, body, header)
    .then((res) => res.data['access_token'])

  res.cookie(`${process.env.REACT_APP_NAME}-token`, accessToken)

  const gitHubUser = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then((res) => res.data)

  const user = await Users.findOne({
    where: { email: gitHubUser.email }
  })

  if (user === null) {
    const newUser = await Users.create({
      email: gitHubUser.email,
      password: '',
      name: gitHubUser.name,
      username: gitHubUser.login
    })

    await UserProfiles.create({
      user_id: newUser.id
    })

    await UserServices.create({
      user_id: newUser.id,
      provider: 'github',
      provider_id: gitHubUser.id,
      provider_token: accessToken
    })
  }

  await UserServices.update({
    provider_token: accessToken
  }, {
    where: { id: user.id }
  })

  const token = jwt.sign({ githubUser: gitHubUser, id: user.id }, process.env.SECRET, {
    expiresIn: 86400
  })

  res.cookie(`${process.env.REACT_APP_NAME}-auth-token`, token)

  res.redirect(`${process.env.FRONTEND_URL}home`)
}

const redirect = (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user:email`)
}

module.exports = {
  callback,
  redirect
}
