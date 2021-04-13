const axios = require('axios')

const callback = (req, res) => {
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code
  };

  const header = {
    headers: {
      Accept: 'application/json'
    }
  }

  axios.post(`https://github.com/login/oauth/access_token`, body, header)
    .then((res) => res.data['access_token'])
    .then((token) => res.json({ token }))
}

const redirect = (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`)
}

module.exports = {
  callback,
  redirect
}
